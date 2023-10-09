import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';

import Logo from '../../../assets/images/logo.png';
import Goback from '../../../assets/icons/goback.png';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DATABASE, FIREBASE_STORAGE } from '../../../firebaseConfig';
import { FlatList } from 'react-native';
import { doc, collection, getDoc, updateDoc, onSnapshot, getDocs, collectionQuery } from 'firebase/firestore';
import CustomButton from '../../components/CustomButton';


const ListingPage = ({ route }) => {

    const { height } = useWindowDimensions();
    const Navigation = useNavigation();

    const [listingData, setListingData] = useState(null);

    useEffect(() => {
        const { listingData } = route.params; // Get the listing data from the route params

        if (listingData) {
            setListingData(listingData);
        }
    }, [route.params]);



    return (
        <SafeAreaView style={styles.safe}>
            <View>

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

                {listingData && (
                    <View >
                        <Image
                            source={{ uri: listingData.imageURL }}
                            style={styles.listingImage}
                            resizeMode="cover"
                        />
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 25, marginLeft: 20, marginBottom: 5, fontWeight: 'bold' }}>{listingData.Title}</Text>
                            <Text style={{ fontSize: 20, marginLeft: 20, marginBottom: 5, fontWeight: 'bold' }}>Price:   {listingData.Price}</Text>
                            <Text style={{ fontSize: 20, marginLeft: 20, marginBottom: 5, fontWeight: 'bold' }}>Location:    {listingData.Location}</Text>
                            <Text style={{ fontSize: 20, marginLeft: 20, marginBottom: 5, fontWeight: 'bold' }}>Zip Code:    {listingData.Zipcode}</Text>
                            <Text style={{ fontSize: 20, marginLeft: 20, marginBottom: 5, fontWeight: 'bold' }}>VIN:     {listingData.VIN}</Text>
                            <Text style={{ fontSize: 20, marginLeft: 20, marginBottom: 5, fontWeight: 'bold' }}>Description: </Text>
                            <Text style={{ fontSize: 20, marginLeft: 20, marginBottom: 5 }}>{listingData.Description}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={[styles.button1]}
                            >
                                <Text style={{ color: 'black', textAlign: 'center' }}> Message </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button]}
                            >
                                <Text style={{ color: 'black', textAlign: 'center' }}> Make Offer </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                }

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
    logo: {
        marginLeft: 20,
        width: '20%',
    },
    title: {
        fontSize: 30,
        marginTop: 25,
        color: "#FAC503",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#FFD43C",
        width: "40%",
        padding: 15,
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
    },
    button1: {
        marginTop: 20,
        backgroundColor: "lightgrey",
        width: "40%",
        padding: 15,
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        marginLeft: 30,
        marginRight: 20,
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
        marginBottom: 10,
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
    },
    listingPair: {
        flex: 1,
        backgroundColor: '#fff', // Background color for each item
        borderRadius: 5, // Optional: Add rounded corners
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
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    listingTitle: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ListingPage;




