import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet, Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection, onSnapshot, updateDoc, doc, setDoc} from "firebase/firestore";

import { FIREBASE_DATABASE, FIREBASE_STORAGE, FIREBASE_AUTH } from '../../firebaseConfig';
import Logo from '../../assets/images/logo.png';
import Goback from '../../assets/icons/goback.png';
import AddPhoto from '../../assets/images/addphoto.png';

const EditListingPage = ({ route }) => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { listingData } = route.params;
  const [successModalVisible, setSuccessModalVisible] = useState(false); 

  const [editedListingData, setEditedListingData] = useState({
    Title: '',
    Price: '',
    Description: '',
    Location: '',
    Zipcode: '',
    VIN: '',
    Year: '',
    Color: '',
    Mileage: '',
    imageURL: '',
  });


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setEditedListingData({ ...editedListingData, imageURL: selectedAsset.uri });
    }
  };

  const saveChanges = async () => {
    try {
      const listingDocRef = doc(FIREBASE_DATABASE, 'usersListing', listingData.id);

      await updateDoc(listingDocRef, {
        Title: editedListingData.Title,
        Price: editedListingData.Price,
        Description: editedListingData.Description,
        Location: editedListingData.Location,
        Zipcode: editedListingData.Zipcode,
        VIN: editedListingData.VIN,
        Year: editedListingData.Year,
        Color: editedListingData.Color,
        Mileage: editedListingData.Mileage,
        imageURL: editedListingData.imageURL,
      });

      setSuccessModalVisible(true);

      setTimeout(() => {
        setSuccessModalVisible(false);
        navigation.navigate('Homepage');
      }, 3000);
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };
  
  useEffect(() => {
    setEditedListingData({
      Title: listingData.Title || '',
      Price: listingData.Price || '',
      Description: listingData.Description || '',
      Location: listingData.Location || '',
      Zipcode: listingData.Zipcode || '',
      VIN: listingData.VIN || '',
      Year: listingData.Year || '',
      Color: listingData.Color || '',
      Mileage: listingData.Mileage || '',
      imageURL: listingData.imageURL || '',
    });
  }, [listingData]);
  
  const handleInputChange = (key, text) => {
    let sanitizedText = text;
    if (
      key === 'Price' ||
      key === 'Mileage' ||
      key === 'Zipcode' ||
      key === 'Year'
    ) {
      sanitizedText = text.replace(/[^0-9]/g, '');
    } else if (key === 'Color') {
      sanitizedText = text.replace(/[^a-zA-Z]/g, '');
    }

    setEditedListingData({ ...editedListingData, [key]: sanitizedText });
  };

  return (
    <SafeAreaView style={styles.safe}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
            <Image
              source={Goback}
              style={[styles.goback, { height: height * 0.05 }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.1 }]}
            resizeMode="contain"
          />
          <Text style={styles.title}> CarHive </Text>
        </View>
        <ScrollView> 

        <View style={styles.body}>

        <TouchableOpacity onPress={pickImage}>
            {editedListingData.imageURL ? (
              <Image source={{ uri: editedListingData.imageURL }} style={styles.listingImage} resizeMode="cover" />
            ) : (
              <Image source={AddPhoto} style={styles.image1} resizeMode="contain" />
            )}
          </TouchableOpacity>

          <Text style={styles.subheading}> TITLE </Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={editedListingData.Title}
            onChangeText={(text) => handleInputChange('Title', text)}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.subheading1}> PRICE </Text>
            <Text style={styles.subheading2}> YEAR </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input2}
              placeholder="Price"
              value={editedListingData.Price}
              onChangeText={(text) => handleInputChange('Price', text)}
            />
            <TextInput
              style={styles.input2}
              placeholder="Year"
              value={editedListingData.Year}
              onChangeText={(text) => handleInputChange('Year', text)}
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
        <Text style={styles.subheading1}> COLOR</Text>
            <Text style={styles.subheading2}>MILEAGE </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input2}
              placeholder="Color"
              value={editedListingData.Color}
              onChangeText={(text) => handleInputChange('Color', text)}
            />
            <TextInput
              style={styles.input2}
              placeholder="Mileage"
              value={editedListingData.Mileage}
              onChangeText={(text) => handleInputChange('Mileage', text)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.subheading1}> LOCATION </Text>
            <Text style={styles.subheading3}> ZIPCODE </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input2}
              placeholder="Location"
              value={editedListingData.Location}
              onChangeText={(text) => handleInputChange('Location', text)}
            />
            <TextInput
              style={styles.input2}
              placeholder="Zipcode"
              value={editedListingData.Zipcode}
              onChangeText={(text) => handleInputChange('Zipcode', text)}
            />
          </View>

          <Text style={styles.subheading}> DESCRIPTION </Text>

          <TextInput
            style={styles.input1}
            placeholder="Description"
            value={editedListingData.Description}
            multiline
            onChangeText={(text) => handleInputChange('Description', text)}
          />

          <Text style={styles.subheading}> VEHICLE VIN </Text>

          <TextInput
            style={styles.input}
            placeholder="VIN"
            value={editedListingData.VIN}
            onChangeText={(text) => handleInputChange('VIN', text)}
          />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={saveChanges} 
        >
          <Text style={{ color: 'black', textAlign: 'center' }}>
            Save
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={successModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}> Updated Successfully!</Text>
            </View>
          </View>
        </Modal>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: '-10%',
  },
  logo: {
    marginLeft: 20,
    width: '20%',
  },
  title: {
    fontSize: 30,
    marginTop: 25,
    color: '#FAC503',
  },
  goback: {
    width: 30,
    height: 30,
    marginTop: 25,
    marginLeft: 20,
    marginRight: -10,
  },
  input: {
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
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
    marginVertical: 5,
  },
  input2: {
    backgroundColor: 'lightgrey',
    width: '45%',
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  editButton: {
    backgroundColor: '#FFD43C',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'center',
  },
  body: {
    marginLeft: 30,
  },
  subheading: {
    textAlign: 'center' ,
    fontSize: 15,
    marginRight: 50,
    fontWeight: 'bold'

  },
  subheading1: {
    fontSize: 15,
    marginLeft: '13%',
    fontWeight: 'bold'

  },
  subheading2: {
    fontSize: 15,
    marginLeft: '31%',
    fontWeight: 'bold'

  },
  subheading3: {
    fontSize: 15,
    marginLeft: '23%',
    fontWeight: 'bold'
  },
  removeImageButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    top: 5,
    right: 0,
  },
  addImageButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 40,
  },
  imageContainer: {
    marginLeft: -110,
  },
  image: {
    width: 50,
    height: 60,
    marginLeft: 130,
  },
  image1: {
    marginTop: 20,
    width: 150,
    height: 100,
    marginLeft: 120,
    borderRadius: 40,
  },
  listingImage: {
    width: "100%",
    height: 180,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginLeft: -30
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFD43C',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EditListingPage;
