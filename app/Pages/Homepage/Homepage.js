import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import Loc from '../../../assets/icons/location.png';
import Sorting from '../../../assets/icons/swap.png';
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

    const [searchInput, setSearchInput] = useState('');
    const [filteredListingInfo, setFilteredListingInfo] = useState(null);

    const [filterByPrice, setfilterByPrice] = useState(false);
    const [sortByPrice, setSortByPrice] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOptionsVisible, setSortOptionsVisible] = useState(false);
    const [locationInput, setLocationInput] = useState('');

    const sortListingsByPrice = () => {
        let sortedListings = [...(filteredListingInfo || listingInfo)];

        if (sortByPrice === 'lowToHigh') {
            sortedListings.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
        } else if (sortByPrice === 'highToLow') {
            sortedListings.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
        }

        setFilteredListingInfo(sortedListings);
    };

    const filterListingsByPriceRange = () => {
        const filteredList = listingInfo.filter((item) => {
            const price = parseFloat(item.Price);
            const min = minPrice ? parseFloat(minPrice) : Number.MIN_SAFE_INTEGER;
            const max = maxPrice ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER;

            return price >= min && price <= max;

        });
        setFilteredListingInfo(filteredList);
    };
    const handleFiltering = () => {
        setfilterByPrice(!filterByPrice);
        if (!filteredListingInfo) {
            sortListingsByPrice();
        }
    };
    const handleSorting = () => {
        setSortOptionsVisible(!sortOptionsVisible);

    };

    const handleSortingOption = (option) => {
        setSortByPrice(option);
        sortListingsByPrice(option);

    };
    const searchListings = () => {
        const keywords = searchInput.toLowerCase().split(' ');

        const filteredList = listingInfo.filter((item) => {
            const lowerCaseSearchInput = searchInput.toLowerCase();
            const lowerCaseTitle = item.Title.toLowerCase();
            const lowerCaseDescription = item.Description.toLowerCase();
            const lowerCaseVIN = item.VIN.toLowerCase();
            const lowerCaseLocation = item.Location.toLowerCase();

            return keywords.some((keyword) => {
                return lowerCaseTitle.includes(keyword) ||
                    lowerCaseDescription.includes(keyword) ||
                    lowerCaseVIN.includes(keyword) ||
                    lowerCaseLocation.includes(lowerCaseSearchInput)

            });
        });
        setFilteredListingInfo(filteredList);
    };

    const handleSearchInputChange = (text) => {
        setSearchInput(text);
    };

    const handleSearchButtonClick = () => {
        if (searchInput) {
            searchListings(); // Filter listings based on the search input
        } else {
            setFilteredListingInfo(null); // Clear the filtered results
        }
    };

    // useEffect(() => {
    //     // If search input is empty, show all listings; otherwise, filter based on the search input
    //     if (searchInput === '') {
    //         setFilteredListingInfo(listingInfo);
    //         getListingInfo();
    //     } else {
    //         searchListings();
    //     }
    // }, [searchInput, listingInfo]);

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
                        placeholderTextColor="black"
                        value={searchInput}
                        onChangeText={handleSearchInputChange} />

                    <TouchableOpacity
                        onPress={handleSearchButtonClick}
                    >
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                marginTop: 15,
                                marginLeft: 10,
                            }}
                            source={require('../../../assets/icons/search.png')} resizeMode='contain' />
                    </TouchableOpacity>
                </View>

                {/* <View style={{ flexDirection: 'row' }}>
                    <Image source={Sorting} style={[styles.icon_sub, { height: height * 0.3 }]}
                        resizeMode="contain"
                    />
                    <Image source={Filter} style={[styles.icon_sub1, { height: height * 0.3 }]}
                        resizeMode="contain"
                    />
                </View> */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={handleSorting}
                        style={{
                            width: 20,
                            height: 40,
                            marginTop: 5,
                            marginLeft: 10,
                            marginRight: 15,
                            marginBottom: 5,
                        }}
                    >
                        <Image source={Sorting} style={[styles.icon_sub, { height: height * 0.3 }]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={handleFiltering}
                        style={{
                            width: 20,
                            height: 20,
                            marginTop: 5,
                        }}
                    >
                        <Image source={Filter} style={[styles.icon_sub, { height: height * 0.3 }]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>

                    {sortOptionsVisible && (
                        <View style={styles.sortOptionsContainer}>
                            <TouchableOpacity
                                onPress={() => handleSortingOption('lowToHigh')}
                                style={styles.sortOption}
                            >
                                <Text>Low to High</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSortingOption('highToLow')}
                                style={styles.sortOption}
                            >
                                <Text>High to Low</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {filterByPrice && (
                        <View style={styles.priceRangeContainer}>
                            <TextInput style={styles.filtering}
                                placeholder="Min Price"
                                keyboardType="numeric"
                                value={minPrice}
                                onChangeText={(text) => setMinPrice(text)}
                            />
                            <TextInput style={styles.filtering}
                                placeholder="Max Price"
                                keyboardType="numeric"
                                value={maxPrice}
                                onChangeText={(text) => setMaxPrice(text)}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    filterListingsByPriceRange(parseFloat(minPrice), parseFloat(maxPrice), locationInput);
                                }}
                            >
                                <Text style={styles.button}> Search </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <FlatList
                    data={filteredListingInfo || listingInfo}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.listingContainer}
                            onPress={() => {
                                Navigation.navigate('ListingPage', { listingData: item });
                            }}
                        >
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
        marginLeft: "82%",
    },
    icon_sub1: {
        marginTop: 10,
        maxHeight: 30,
        maxWidth: 30,
        marginLeft: "1%",

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
    filtering: {
        backgroundColor: 'lightgrey',
        width: "100%",
        height: 30,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        textAlign: 'center',
        marginLeft: 30,

    },
    sortOption: {
        backgroundColor: 'lightgrey',
        width: '80%',
        height: 30,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginLeft: 30,
        textAlign: 'center'
    },

    button: {
        backgroundColor: "#FFD43C",
        width: "100%",
        padding: 8,
        borderRadius: 20,
        textAlign: 'center',
        marginLeft: 30,

    }

});

export default Homepage;