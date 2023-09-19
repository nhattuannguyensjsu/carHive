import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';

import Logo from '../../../assets/images/logo.png';
import IDCard from '../../../assets/images/id-card.png';

import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DATABASE, FIREBASE_STORAGE } from '../../../firebaseConfig';
import CustomButton from '../../components/CustomButton/CustomButton';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { BlurView, VibrancyView } from "@react-native-community/blur"
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Uploading } from "../../components/Uploading"
import Modal from 'react-native-modal'; // Import the modal component


const UploadIDPage = () => {

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // State for success modal
    const [pickedImage, setPickedImage] = useState(""); // Store the picked image URL
    // const [image, setImage] = useState("");
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState([]);
    const { height } = useWindowDimensions();

    // async function pickImage() {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images, // here it is where we specify the allow format
    //         allowsEditing: true,
    //         aspect: [3, 4],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //         // to upload image see the next function
    //         await uploadImage(result.assets[0].uri, "image");
    //     }
    // }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setPickedImage(result.assets[0].uri); // Set the picked image URL
            // await uploadImage(result.assets[0].uri, "image");
        }
    }

    async function uploadImage(uri, fileType) {
        if (!pickedImage) {
            // Handle error if no image is picked
            return;
        }

        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(FIREBASE_STORAGE, "PhotoID/" + new Date().getTime());

        const uploadTask = uploadBytesResumable(storageRef, blob);

        // listen for events
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setProgress(progress.toFixed());
            },
            (error) => {
                // handle error
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log("File available at", downloadURL);
                    // save record
                    await saveRecord(fileType, downloadURL, new Date().toISOString());
                    setPickedImage("");
                });
            },
        );
    }

    async function saveRecord(fileType, url, createdAt) {
        const user = FIREBASE_AUTH.currentUser;
        const userDocRef = doc(FIREBASE_DATABASE, "photoID", user.email);

        try {
            await setDoc(userDocRef, {
                fileType: fileType,
                url,
                createdAt,
            });
            console.log("document saved correctly", userDocRef.id);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleUpload() {
        if (pickedImage) {
            await uploadImage(pickedImage, "image");
            setIsSuccessModalVisible(true); // Show success modal when upload is complete

        } else {
            console.log("No image is picked")
            // Handle the case where no image is picked
        }
    }

    useEffect(() => {

        const unsubscribe = onSnapshot(collection(FIREBASE_DATABASE, "photoID"), (snapshot) => {
            // listen to changes in the collection in firestore
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // if a new file is added, add it to the state
                    console.log("New file", change.doc.data());
                    setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
                }
            });
        });

        return () => unsubscribe();
        // It is a good practice to unsubscribe to the listener when unmounting.
        // Because if you don't, you will have a memory leak.
    }, []);

    return (
        <SafeAreaView>
            <View>

                <View style={{ flexDirection: 'row' }}>

                    <Image source={Logo}
                        style={[styles.logo, { height: height * 0.1 }]}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}> CarHive </Text>
                </View>

                <View>
                    <Text style={styles.text}> Upload ID for Verification </Text>
                </View>

                {pickedImage ? ( // Render the picked image if it exists
                    <Image
                        source={{ uri: pickedImage }}
                        style={{ width: "100%", height: 200, marginTop: 20 }}
                        resizeMode="contain"
                    />
                ) : (
                    <Image source={IDCard}
                        style={[styles.image]}
                        resizeMode="contain"
                    />
                )}

                <TouchableOpacity
                    style={[styles.button]}
                    onPress={pickImage}
                >
                    <Text style={{ color: 'black', textAlign: 'center' }}> Choose Image </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={handleUpload}
                >
                    <Text style={{ color: 'black', textAlign: 'center' }}> Submit </Text>
                </TouchableOpacity>
                {/* Success Modal */}
                <Modal isVisible={isSuccessModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Upload Successfully!</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setIsSuccessModalVisible(false); // Hide the success modal
                                // Add navigation logic to go back to the home page here
                            }}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 50

    },
    logo: {
        marginLeft: 20,
        width: '20%',

    },
    title: {
        fontSize: 30,
        marginTop: 15,
        color: "#FAC503",
    },
    image: {
        marginTop: 20,
        width: 300,
        height: 300,
        alignSelf: 'center'
    },
    button: {
        marginTop: 20,
        backgroundColor: "#FFD43C",
        width: "60%",
        padding: 15,
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 25,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginTop: 10,
        padding: 10,

    },
    modalButton: {
        backgroundColor: '#FFD43C',
        paddingTop: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
    },


});

export default UploadIDPage;




