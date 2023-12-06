import React, { useEffect, useState } from 'react';
import { Image, Modal, View, StyleSheet, TouchableOpacity, useWindowDimensions, SafeAreaView, Text, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Goback from '../../assets/icons/goback.png';
import Logo from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../firebaseConfig';

const MakeOfferPage = ({route}) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [listingData, setListingData] = useState(null);
  const [price, setPrice] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const { listingData } = route.params ?? {};
    setListingData(listingData);
  }, [route.params]);
  
  const sendOffer = async (listingData, price) => {
    try {
      if (!price || isNaN(price)) {
        return;
      }

    const user = FIREBASE_AUTH.currentUser.email;
    if (!user) {
      console.error("User not authenticated");
      return;
    }

      const offerMessage = `"${user}" has made an offer on listing "${listingData.Title}" for $${price}`;
  
      await addDoc(collection(FIREBASE_DATABASE, 'chats'), {
        text: offerMessage,
        user: FIREBASE_AUTH.currentUser.email,
        createdAt: new Date(),
        recipient: listingData.Email,
      });
       setIsModalVisible(true);

       setPrice('');
    
    } catch (error) {
      console.error('Error sending offer:', error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  
  return (
    <SafeAreaView style={styles.safe}>
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={Goback} style={[styles.goback, { height: height * 0.05 }]} resizeMode="contain" />
            </TouchableOpacity>
            <Image source={Logo} style={[styles.logo, { height: height * 0.1 }]} resizeMode="contain" />
            <Text style={styles.title}> CarHive </Text>
        </View>

      {listingData && (
        <>
          <View style={styles.wrapWhite}>
            <Image source={{ uri: listingData.imageURL }} resizeMode="cover" style={styles.innerImg} />
          </View>

          <Text style={styles.txtSeller}>Seller’s price</Text>
          <TouchableOpacity style={styles.wrapPrice}>
            <Text style={styles.txtPrice}>{`$ ${listingData.Price}`}</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={{ ...styles.txtSeller, marginTop: hp('5%') }}>Your offer</Text>
      <TextInput placeholder="$"
       style={styles.txtInp} 
       placeholderTextColor={'#000000'}
       keyboardType="numeric"
       onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ''))}
       />
      <TouchableOpacity onPress={() => sendOffer(listingData, price)} style={{ ...styles.wrapPrice, marginTop: hp('5%') }}>
    <Text style={styles.txtPrice}>Submit</Text>
  </TouchableOpacity>

  <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Offer Sent Successfully!</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
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
  setWidth: {
    width: wp('90%'),
    alignSelf: 'center',
  },
  txtSeller: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
  txtPrice: {
    color: '#000000',
    fontSize: 16,
  },
  wrapPrice: {
    backgroundColor: '#FFD43C',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: wp('35%'),
    height: hp('6%'),
    marginTop: hp('1%'),
  },
  txtInp: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: wp('35%'),
    height: hp('6%'),
    marginTop: hp('1%'),
    paddingHorizontal: wp('5%'),
    fontSize: 16,
    textAlign: 'center'
  },
  wrapImgCar: {
    width: wp('90%'),
    height: hp('30%'),
  },
  innerImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  wrapWhite: {
      width: '95%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 10,
      marginLeft: 10,
  },
  wrapImgLogo: {
    width: wp('60%'),
    height: hp('10%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FFD43C',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MakeOfferPage;
