import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';

import Logo from '../../../assets/images/logo.png';
import IDCard from '../../../assets/images/id-card.png';
import Goback from '../../../assets/icons/goback.png';

import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DATABASE, FIREBASE_STORAGE } from '../../../firebaseConfig';
import CustomButton from '../../components/CustomButton/CustomButton';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Modal from 'react-native-modal';


const UploadIDPage = () => {

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [pickedImage, setPickedImage] = useState("");
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState([]);
    const { height } = useWindowDimensions();
    const Navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setPickedImage(result.assets[0].uri);
        }
    }

    async function uploadImage(uri, fileType) {
        if (!pickedImage) {
            return;
        }

        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(FIREBASE_STORAGE, "PhotoID/" + new Date().getTime());

        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setProgress(progress.toFixed());
            },
            (error) => {
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
        const userDocRef = doc(FIREBASE_DATABASE, "usersPhotoID", user.email);
        // const photoIDCollectionRef = collection(userDocRef, "PhotoID");
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
            console.log('Starting upload image...');
            setLoading(true);
            const startTime = performance.now();
            await uploadImage(pickedImage, "image");
            setIsSuccessModalVisible(true);
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            console.log(`upload image completed in ${elapsedTime} ms`);
        } else {
            console.log("No image is picked")
        }
    }

    useEffect(() => {

        const unsubscribe = onSnapshot(collection(FIREBASE_DATABASE, "users"), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("New file", change.doc.data());
                    setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
                }
            });
        });

        return () => unsubscribe();

    }, []);

    return (
        <SafeAreaView style={styles.safe}>
            <View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => Navigation.navigate("ProfilePage")}>
                        <Image source={Goback}
                            style={[styles.goback, { height: height * 0.05 }]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Image source={Logo}
                        style={[styles.logo, { height: height * 0.1 }]}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}> CarHive </Text>
                </View>

                <View>
                    <Text style={styles.text}> Upload ID for Verification </Text>
                </View>

                {pickedImage ? (
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
                                setIsSuccessModalVisible(false);
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
    safe: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: "-10%"

    },
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
        marginTop: 25,
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
    goback: {
        width: 30,
        height: 30,
        marginTop: 25,
        marginLeft: 20,
        marginRight: -10
    }
});

export default UploadIDPage;




