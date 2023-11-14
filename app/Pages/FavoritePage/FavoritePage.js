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
import { collection, getDocs, where, query, onSnapshot } from 'firebase/firestore';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Modal from 'react-native-modal';


const FavoritePage = () => {
    const { height } = useWindowDimensions();
    const Navigation = useNavigation();
    const [favoriteListings, setFavoriteListings] = useState([]);

    useEffect(() => {
        const fetchFavoriteListings = async () => {
          try {
            const user = FIREBASE_AUTH.currentUser;
      
            // Get the reference to the user's favorites collection
            const favoritesCollection = collection(FIREBASE_DATABASE, 'favorites', user.email, 'FavoriteListings');
      
            // Create a query to get all documents in the favorites collection
            const favoritesQuery = query(favoritesCollection);
      
            // Subscribe to changes in the favorites collection
            const unsubscribe = onSnapshot(favoritesQuery, (snapshot) => {
              const favorites = snapshot.docs.map((doc) => doc.data());
              setFavoriteListings(favorites);
            });
      
            return () => unsubscribe(); // Cleanup the subscription when the component unmounts
          } catch (error) {
            console.error('Error fetching user favorites:', error);
          }
        };
      
        fetchFavoriteListings();
      }, []);

    
    return (
        <SafeAreaView style={styles.safe}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => Navigation.navigate("Homepage")}>
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
                    <Text style={styles.text}> My Favorites </Text>
                </View>

                <FlatList
            data={favoriteListings}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={2}  // Set the number of columns to 2
            renderItem={({ item }) => (
                <TouchableOpacity
                style={styles.listingContainer}
                onPress={() => {
                    Navigation.navigate('ListingPage', { listingData: item });
                }}
            >
                <View style={styles.listingPair}>
                    <Image
                    source={{ uri: item.imageURL }}  // Assuming imageURL is present in the favorite listings
                    style={styles.listingImage}
                    resizeMode="cover"
                    />
                    <View style={styles.listingContent}>
                    <Text style={styles.listingTitle}>{item.Title}</Text>
                    </View>
                </View>
                
                </TouchableOpacity>
             
            )}
            />
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
        textAlign: 'left',
        marginLeft: 30,
        fontWeight: 'bold'
        },
    logo: {
        marginLeft: 20,
        width: '20%',
    },
    title: {
        fontSize: 30,
        marginTop: 25,
        color: "#FAC503",
        marginBottom: 10
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
    },
    listingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
    },
    listingPair: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    listingImage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        resizeMode: 'cover',
    },
    listingTitle: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FavoritePage;




