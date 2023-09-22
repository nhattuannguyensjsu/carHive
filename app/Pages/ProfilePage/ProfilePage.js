import React, { useState, useEffect } from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import Profile from '../../../assets/icons/profile.png';
import Edit from '../../../assets/icons/edit.png';
import Listing from '../../../assets/icons/listing.png';
import Fav from '../../../assets/icons/fav.png';
import Lock from '../../../assets/icons/lock.png'

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DATABASE } from '../../../firebaseConfig';
import CustomButton from '../../components/CustomButton/CustomButton';
import { doc, collection, getDoc, updateDoc } from 'firebase/firestore';

const ProfilePage = () => {
    const { height } = useWindowDimensions();
    const Navigation = useNavigation();

    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
        try {
            const user = FIREBASE_AUTH.currentUser;

            if (user) {
                const userDocRef = doc(FIREBASE_DATABASE, 'users', user.email);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    setUserInfo(userDocSnapshot.data());
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const updateName = async () => {
        // Set user data in Firestore
        updateDoc(doc(FIREBASE_DATABASE, "users", user.email), {
            name: userInfo.name,
        })
            .then(() => {
                console.log('Data submitted');
                Navigation.navigate("SignUpConfirmationPage");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }


    useEffect(() => {
        // Call getUserInfo when the component mounts
        getUserInfo();
    }, []);

    return (
        <SafeAreaView style={styles.safe}>
                <View>
                    <View style={{ flexDirection: 'row' }}>

                        <Image source={Logo}
                            style={[styles.logo, { height: height * 0.1 }]}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}> CarHive </Text>

                    </View>
                    <View style={styles.root}>
                        <Image source={Profile}
                            style={[styles.profile, { height: height * 0.1 }]}
                            resizeMode="contain" />
                    </View>

                    <View >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text_sub}>  Name:   {userInfo ? userInfo.name : ''}</Text>
                            <Image source={Edit} style={[styles.subicon, { height: height * 0.1 }]}
                                resizeMode="contain"
                                onPress={updateName}
                            />

                        </View>
                        <Text style={styles.text_sub}>  Email:  {userInfo ? userInfo.email : ''}   </Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={styles.text_sub}>  Password:   {userInfo ? userInfo.password : ''} </Text>
                            <Image source={Lock} style={[styles.subicon, { height: height * 0.1 }]}
                                resizeMode="contain" />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <Image source={Listing} style={styles.icon}
                            resizeMode="contain"
                        />
                        <Text style={styles.text_sub}> My Listing </Text>

                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <Image source={Fav} style={styles.icon}
                            resizeMode="contain"
                        />
                        <Text style={styles.text_sub}> Favorites </Text>

                    </View>

                    <View style={styles.custom}>
                        <CustomButton text='ID Verification' onPress={() => Navigation.navigate('UploadIDPage')} />
                    </View>
                    <View style={styles.custom}>
                        <CustomButton text="LOGOUT" onPress={() => FIREBASE_AUTH.signOut()} />
                    </View>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
    safe: {
        flex: 1,
        backgroundColor: "white",
    },
    custom: {
        alignItems: 'center',
        marginTop: -20
    },
    logo: {
        marginLeft: 20,
        width: '20%',
    },
    profile: {
        width: '20%',
        alignItems: 'center',
        marginTop: 20
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
    subicon: {
        marginTop: 22,
        maxHeight: 20,
        maxWidth: 20
    }
});

export default ProfilePage;




