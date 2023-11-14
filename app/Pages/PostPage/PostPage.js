import { View, Text, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Logo from '../../../assets/images/logo.png';
import { TextInput } from 'react-native-gesture-handler';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE } from "../../../firebaseConfig";
import CustomButton from '../../components/CustomButton';
import { doc, documentId, setDoc } from "firebase/firestore";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Modal from 'react-native-modal';
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
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [mileage, setMileage] = useState('');

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
      quality: 0.5,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri); // Set the picked image URL
    }
  }

  async function uploadImage(uri) {
    if (!pickedImage) {
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

    try {
      await addDoc(userDocRef, {
        Email: user.email,
        Title: title,
        Price: price,
        Description: desc,
        Location: location,
        Zipcode: zipcode,
        VIN: VIN,
        Year: year,
        Color: color,
        Mileage: mileage,
        imageURL,
      });
      console.log("document saved correctly", userDocRef.id);

    } catch (error) {
      console.error("Error saving data to Firestore: ", error);
    }
  }

  async function handleUpload() {
    if (pickedImage && title && price && desc && Location && VIN && year && color && mileage) {
      await uploadImage(pickedImage, "image");
      setIsSuccessModalVisible(true);
      // Reset the input fields
      setTitle('');
      setPrice('');
      setDesc('');
      setVIN('');
      setLocation('');
      setZipcode('');
      setMileage('');
      setColor('');
      setYear('');
      setPickedImage('');

    } else {
      console.log("Please fill out all fields and select an image.");
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DATABASE, "usersListing"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
        }
      });
    });
    return () => unsubscribe();

  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>

            <Image source={Logo}
              style={[styles.logo, { height: height * 0.1 }]}
              resizeMode="contain"
            />
            <Text style={styles.title}> CarHive </Text>

          </View>
          <Text style={styles.heading}>Post Item</Text>

          <View style={styles.body} >
            {pickedImage ? (
              <Image
                source={{ uri: pickedImage }}
                style={{ width: 300, height: 100, marginTop: 20 }}
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

            {/* <Text style={styles.subheading}> Title </Text> */}
            <TextInput style={styles.input}
              placeholder="Title"
              autoCapitalize="none"
              value={title}
              onChangeText={(text) => setTitle(text)}>
            </TextInput>



            {/* <Text style={styles.subheading}> Price </Text> */}
            <View style={{ flexDirection: 'row' }}>
              <TextInput style={styles.input2}
                placeholder="Price"
                keyboardType="numeric"
                autoCapitalize="none"
                value={price}
                onChangeText={(text) => setPrice(text)}>
              </TextInput>
              <TextInput style={styles.input2}
                placeholder="Year"
                autoCapitalize="none"
                value={year}
                onChangeText={(text) => setYear(text)}>
              </TextInput>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TextInput style={styles.input2}
                placeholder="Color"
                autoCapitalize="none"
                value={color}
                onChangeText={(text) => setColor(text)}>
              </TextInput>
              <TextInput style={styles.input2}
                placeholder="Mileage"
                keyboardType="numeric"
                autoCapitalize="none"
                value={mileage}
                onChangeText={(text) => setMileage(text)}>
              </TextInput>
            </View>

            {/* <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subheading1}> Location </Text>
              <Text style={styles.subheading}> Zip Code </Text>
            </View> */}

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

            {/* <Text style={styles.subheading}> Description </Text> */}
            <TextInput style={styles.input1}
              placeholder="Description"
              autoCapitalize="none"
              multiline
              value={desc}
              onChangeText={(text) => setDesc(text)}>
            </TextInput>

            {/* <Text style={styles.subheading} > Vehicle VIN </Text> */}
            <TextInput style={styles.input}
              placeholder="VIN"
              autoCapitalize="none"
              value={VIN}
              onChangeText={(text) => setVIN(text)}>
            </TextInput>

            <CustomButton
              text="Post"
              onPress={() => handleUpload()} />

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
    marginBottom: "15%"
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
    width: 100,
    height: 100,
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
    height: 150,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
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