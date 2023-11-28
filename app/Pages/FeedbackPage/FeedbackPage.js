import React, { useState } from 'react';
import {useWindowDimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import Logo from '../../../assets/images/logo.png';
import { FIREBASE_DATABASE, FIREBASE_AUTH} from '../../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const FeedbackPage = () => {
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const [appRating, setAppRating] = useState(0);
    const [maxAppRating, setMaxAppRating] = useState([1, 2, 3, 4, 5]);

    const [appReview, setAppReview] = useState('');

    const ImgFilled = require('../../../assets/icons/beehive.png');
    const ImgCorner = require('../../../assets/icons/beehive2.png');
    const { height } = useWindowDimensions();
    const Navigation = useNavigation();

    const handleNoThanks = () => {
      Navigation.goBack();
    };

    const CustomRating = () => {
        return (
            <View style={styles.CustomRatingStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setDefaultRating(item)}>
                                <Image style={styles.ImgStyle}
                                    source={
                                        item <= defaultRating
                                            ? ImgFilled
                                            : ImgCorner
                                    } />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    const CustomAppRating = () => {
        return (
            <View style={styles.CustomRatingStyle}>
                {
                    maxAppRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setAppRating(item)}>
                                <Image style={styles.ImgStyle}
                                    source={
                                        item <= appRating
                                            ? ImgFilled
                                            : ImgCorner
                                    } />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    const submitFeedback = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
  
        const feedbackData = {
          appRating: appRating,
          appReview: appReview,
        };
  
        const userFeedbacksCollection = collection(FIREBASE_DATABASE, 'userFeedback');
        await addDoc(userFeedbacksCollection, feedbackData);
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    };
      
      return (
        <SafeAreaView style={styles.safe}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.1 }]}
                resizeMode="contain"
              />
              <Text style={styles.title}> CarHive </Text>
            </View>
            <Text style={styles.text}>
              Thank you for using our application
            </Text>
            {/* <Text style={styles.text}>
              Give us some reviews about the buyer / seller
            </Text>
            <TextInput
              multiline
              style={styles.input1}
              type="text"
              placeholder="Buyer / Seller Email"
            /> */}
    
            {/* <CustomRating />
    
            <TextInput
              multiline
              style={styles.input}
              type="text"
              placeholder="Write some reviews"
            /> */}
    
            <Text style={styles.text}>
              Give us some reviews about our application
            </Text>

            <CustomAppRating />
    
            <TextInput
              multiline
              style={styles.input}
              type="text"
              placeholder="Write some reviews"
              value={appReview}
              onChangeText={(text) => setAppReview(text)}
            />
    
            <TouchableOpacity
              style={[styles.button]}
              activeOpacity={0.7}
              onPress={submitFeedback}>
              <Text style={{ color: 'black', textAlign: 'center' }}> Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity
          style={[styles.button, { backgroundColor: 'grey' }]} 
          activeOpacity={0.7}
          onPress={handleNoThanks}>
          <Text style={{ color: 'white', textAlign: 'center' }}> No Thanks </Text>
        </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      safe: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: '-10%',
      },
      text: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
        marginLeft: 10,
      },
      CustomRatingStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
      },
      ImgStyle: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        marginRight: 5,
      },
      button: {
        backgroundColor: '#FFD43C',
        width: '60%',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
      },
      input: {
        paddingTop: 20,
        backgroundColor: 'lightgrey',
        width: '90%',
        height: '30%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginLeft: 20,
        marginTop: 20
      },
      input1: {
        paddingTop: 10,
        backgroundColor: 'lightgrey',
        width: '90%',
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginLeft: 20,
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
    });
    
    export default FeedbackPage;