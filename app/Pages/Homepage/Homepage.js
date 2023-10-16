import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import Loc from '../../../assets/icons/location.png';
import Swap from '../../../assets/icons/swap.png';
import Filter from '../../../assets/icons/filter.png';
import Search from '../../../assets/icons/search.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Button, TouchableOpacity } from 'react-native';
import { doc, collection, getDoc, updateDoc, onSnapshot, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DATABASE } from '../../../firebaseConfig';
import { FlatList } from 'react-native';
const Homepage = () => {

    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [listingInfo, setListingInfo] = useState([]);

    const getListingInfo = async () => {
        try {
            // Fetch listings from Firebase Firestore
            const listingsCollection = collection(FIREBASE_DATABASE, 'usersListing');
            onSnapshot(listingsCollection, (querySnapshot) => {
                const updatedListings = querySnapshot.docs.map(doc => doc.data());
                setListingInfo(updatedListings);
            });
        } catch (error) {
            console.error('Error fetching user listings:', error);
        }
    };

    // const getListingInfo = async () => {
    //     try {
    //         const user = FIREBASE_AUTH.currentUser;

    //         if (user) {
    //             const listingsCollection = collection(FIREBASE_DATABASE, 'usersListing');

    //             // Initialize an array to hold the listing data
    //             const listingsData = [];

    //             // Set up a real-time listener for the listings
    //             const unsubscribe = onSnapshot(listingsCollection, (querySnapshot) => {
    //                 listingsData.length = 0; // Clear the previous data

    //                 querySnapshot.forEach((doc) => {
    //                     listingsData.push(doc.data());
    //                 });

    //                 // Update listingInfo with the updated data
    //                 setListingInfo(listingsData);
    //             });


    //             return () => {
    //                 unsubscribe();
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user listings:', error);
    //     }
    


    // Location.setGoogleApiKey("AIzaSyBSNJstpPFJMX-Z08gITore8Xwpl3Awg9Y");

    useEffect(() => {
        // const getPermissions = async () => {
        //     let { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //         console.log("Please grant location permissions");
        //         return;
        //     }

        //     let currentLocation = await Location.getCurrentPositionAsync({});
        //     setLocation(currentLocation);
        //     console.log("Location: ");
        //     console.log(currentLocation);
        // };
        // getPermissions();

         getListingInfo();

      
    }, []);


    // const reverseGeocode = async () => {
    //     const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
    //         longitude: location.coords.longitude,
    //         latitude: location.coords.latitude
    //     });

    //     if (reverseGeocodedAddress.length > 0) {
    //         setCity(reverseGeocodedAddress[0].city || '');
    //     }
    //     console.log("Location: ");
    //     console.log(reverseGeocodedAddress);
    // };

    const { height } = useWindowDimensions();
    const Navigation = useNavigation();

    const onSearchPressed = () => {
        Navigation.navigate('SignInPage')
    }



    return (
        <SafeAreaView style={styles.safe}>
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row' }}>

                    <Image source={Logo}
                        style={[styles.logo, { height: height * 0.1 }]}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}> CarHive </Text>

                </View>
{/* 
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={reverseGeocode}>
                        <Image
                            source={Loc}
                            style={[styles.icons, { height: height * 0.05 }]}
                            resizeMode="contain"
                        />

                    </TouchableOpacity>
                    {city && (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 10, marginTop: 15, fontSize: 18 }}>{city}</Text>
                        </View>
                    )}
                </View> */}

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={{
                        backgroundColor: "lightgrey",
                        padding: 10,
                        borderRadius: 20,
                        fontSize: 15,
                        marginTop: 10,
                        paddingLeft: 20,
                        width: "80%",
                        marginLeft: 25

                    }}
                        placeholder='Search by Year, Model or Make'
                        placeholderTextColor="black" />
                    <Image source={require('../../../assets/icons/search.png')}
                        resizeMode='contain'
                        style={{
                            width: 40, height: 40,
                            marginTop: 15,
                            marginLeft: 10,
                        }} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Image source={Swap} style={[styles.icon_sub, { height: height * 0.3 }]}
                        resizeMode="contain"
                    />
                    <Image source={Filter} style={[styles.icon_sub1, { height: height * 0.3 }]}
                        resizeMode="contain"
                    />
                </View>

                <FlatList
                    data={listingInfo}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    numColumns={2} // Set the number of columns to 2
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.listingContainer}
                            onPress={() => {
                                // Navigate to the "ListingPage" when an item is pressed
                                Navigation.navigate('ListingPage', { listingData: item });
                            }}>
                            <View style={styles.listingPair}>

                                <Image
                                    source={{ uri: item.imageURL }}
                                    style={styles.listingImage}
                                    resizeMode="cover"
                                />
                                <Text style={styles.listingTitle}>{item.Title}</Text>


                            </View>
                        </TouchableOpacity>

                    )}
                />

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
    safe: {
        flex: 1,
        backgroundColor: "white",
        marginTop: "-10%",
        marginBottom: "15%"
    },
    icons: {
        marginTop: 10,
        marginLeft: 40,
        maxHeight: 30,
        maxWidth: 30,
    },
    icon_sub: {
        marginTop: 10,
        maxHeight: 30,
        maxWidth: 30,
        marginLeft: "82%"
    },
    icon_sub1: {
        marginTop: 10,
        maxHeight: 30,
        maxWidth: 30,
        marginLeft: "1%"
    },
    custom: {
        alignItems: 'flex-end',
    },

    logo: {
        marginLeft: 20,
        width: '20%',
    },
    profile: {
        width: '100%',
        maxWidth: 150,
        maxHeight: 150,
        alignItems: 'center',

    },
    text: {
        fontSize: 25,
        margin: 1,
    },
    text_sub: {
        fontSize: 18,
        margin: 20,
    },
    title: {
        fontSize: 30,
        marginTop: 25,
        color: "#FAC503",
    },
    icon: {
        marginTop: 15,
        marginLeft: 25,
        maxHeight: 30,
        maxWidth: 30
    },
    listingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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
        elevation: 5,
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

export default Homepage;