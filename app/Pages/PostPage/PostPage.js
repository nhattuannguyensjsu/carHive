import { View, Text, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Logo from '../../../assets/images/logo.png';
import { TextInput } from 'react-native-gesture-handler';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE } from "../../../firebaseConfig";
import CustomButton from '../../components/CustomButton';
import { doc, documentId, setDoc } from "firebase/firestore";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Modal from 'react-native-modal'; // Import the modal component
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import AddPhoto from '../../../assets/images/addphoto.png';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const PostPage = () => {

  const { height } = useWindowDimensions();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [VIN, setVIN] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);

  const [pickedImage, setPickedImage] = useState("");

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // State for success modal

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri); // Set the picked image URL
      // await uploadImage(result.assets[0].uri, "image");
    }
  }

  async function uploadImage(uri) {
    if (!pickedImage) {
      // Handle error if no image is picked
      return;
    }

    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(FIREBASE_STORAGE, "ListingPhoto/" + new Date().getTime());

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
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          saveRecord(downloadURL);
        } catch (error) {
          console.error("Error getting download URL: ", error);
        }
      }
    );
  }

  async function saveRecord(imageURL) {
    const user = FIREBASE_AUTH.currentUser;
    const userDocRef = collection(FIREBASE_DATABASE, "usersListing");
    // const listingsCollectionRef = collection(userDocRef);

    try {
      await addDoc(userDocRef, {
        Email: user.email,
        Title: title,
        Price: price,
        Description: desc,
        Location: location,
        Zipcode: zipcode,
        VIN: VIN,
        imageURL,
      });
      console.log("document saved correctly", userDocRef.id);

    } catch (error) {
      console.error("Error saving data to Firestore: ", error);
    }
  }

  async function handleUpload() {
    if (pickedImage && title && price && desc && Location && VIN) {
      await uploadImage(pickedImage, "image");
      setIsSuccessModalVisible(true);
      // Reset the input fields
      setTitle('');
      setPrice('');
      setDesc('');
      setVIN('');
      setLocation('');
      setZipcode('');
      setPickedImage('');

    } else {
      console.log("Please fill out all fields and select an image.");
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DATABASE, "usersListing"), (snapshot) => {
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
    <SafeAreaView style={styles.safe}>
      <ScrollView showVerticalScrollIndicator={false}>
        <View>
          <View style={{ flexDirection: 'row' }}>

            <Image source={Logo}
              style={[styles.logo, { height: height * 0.1 }]}
              resizeMode="contain"
            />
            <Text style={styles.title}> CarHive </Text>

          </View>
          <Text style={styles.heading}>Post Item</Text>

          <View style={styles.body} >
            {pickedImage ? ( // Render the picked image if it exists
              <Image
                source={{ uri: pickedImage }}
                style={{ width: "100%", height: 200, marginTop: 20 }}
                resizeMode="contain"
              />
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <Image source={AddPhoto}
                  style={[styles.image]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}

            {/* <TouchableOpacity
              style={[styles.button]}
              onPress={pickImage}
            >
              <Text style={{ color: 'black', textAlign: 'center' }}> Choose Image </Text>
            </TouchableOpacity> */}
            <Text style={styles.subheading}> Title </Text>
            <TextInput style={styles.input}
              placeholder="Title"
              autoCapitalize="none"
              value={title}
              onChangeText={(text) => setTitle(text)}>
            </TextInput>


            <Text style={styles.subheading}> Price </Text>
            <TextInput style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              autoCapitalize="none"
              value={price}
              onChangeText={(text) => setPrice(text)}>
            </TextInput>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subheading1}> Location </Text>
              <Text style={styles.subheading}> Zip Code </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TextInput style={styles.input2}
                placeholder="Location"
                autoCapitalize="none"
                value={location}
                onChangeText={(text) => setLocation(text)}>
              </TextInput>
              <TextInput style={styles.input2}
                placeholder="Zipcode"
                autoCapitalize="none"
                keyboardType="numeric"
                value={zipcode}
                onChangeText={(text) => setZipcode(text)}>
              </TextInput>
            </View>

            <Text style={styles.subheading}> Description </Text>
            <TextInput style={styles.input1}
              placeholder="Description"
              autoCapitalize="none"
              multiline
              value={desc}
              onChangeText={(text) => setDesc(text)}>
            </TextInput>

            <Text style={styles.subheading} > Vehicle VIN </Text>
            <TextInput style={styles.input}
              placeholder="VIN"
              autoCapitalize="none"
              value={VIN}
              onChangeText={(text) => setVIN(text)}>
            </TextInput>

            <CustomButton
              text="Post"
              onPress={() => handleUpload()} />

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

        </View>



      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "-10%",
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
  heading: {
    fontSize: 25,
    marginLeft: "10%",
    fontWeight: 'bold',
  },
  subheading: {
    textAlign: 'center',
    fontSize: 20
  },
  subheading1: {
    fontSize: 20,
    marginLeft: "-20%",
    marginRight: "22%"
  },
  image: {
    marginTop: 20,
    width: 150,
    height: 150,
    alignSelf: 'center'
  },
  input: {
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  input1: {
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 80,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  input2: {
    backgroundColor: 'lightgrey',
    width: '45%',
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  body: {
    alignItems: 'center'
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


export default PostPage