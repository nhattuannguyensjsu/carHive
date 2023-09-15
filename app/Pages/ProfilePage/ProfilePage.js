import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions, Button } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import Profile from '../../../assets/icons/profile.png';
import Helpcenter from '../../../assets/icons/helpcenter.png';
import Listing from '../../../assets/icons/listing.png';
import Fav from '../../../assets/icons/fav.png';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DATABASE } from '../../../firebaseConfig';
import CustomButton from '../../components/CustomButton/CustomButton';
import { FlatList } from 'react-native-gesture-handler';
import { collection, getDocs } from 'firebase/firestore';

const ProfilePage = () => {

    const { height } = useWindowDimensions();
    const Navigation = useNavigation();

    const [userInfo, setUserInfo] = useState(null);

    const getUsersInfo = async () => {
        try {
            const usersInfoCol = collection(FIREBASE_DATABASE, 'usersInfo');
            const usersSnapshot = await getDocs(usersInfoCol);

            const usersList = usersSnapshot.docs.map(doc => doc.data());

            if (usersList.length > 0) {
                setUserInfo(usersList[0]); // Assuming you want the first user's data
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }

    }

    // useEffect(() => {
    //     const users_info = async () => {
    //         try {
    //             const querySnapshot = await onSnapshot(collection(FIREBASE_DATABASE, 'usersInfo'));

    //             const users = [];
    //             querySnapshot.forEach((doc) => {
    //                 const { email, password } = doc.data();
    //                 users.push({
    //                     id: doc.id,
    //                     email,
    //                     password,
    //                 });
    //             });

    //             setUsers(users);
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //         }
    //     };

    //     users_info();
    // }, [])


    useEffect(() => {
        // Call getUsersInfo when the component mounts
        getUsersInfo();
    }, []);

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView showVerticalScrollIndicator={true}>
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

                        <Text style={styles.text_sub}>  Name:   {userInfo ? userInfo.name : ''}</Text>

                        <Text style={styles.text_sub}>  Email:  {userInfo ? userInfo.email : ''}   </Text>

                        <Text style={styles.text_sub}>  Password:   {userInfo ? userInfo.password : ''} </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <Image source={Helpcenter} style={styles.icon}
                            resizeMode="contain"
                        />
                        <Text style={styles.text_sub}> Help Center </Text>

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
                        <CustomButton text="LOGOUT" onPress={() => FIREBASE_AUTH.signOut()} />
                    </View>

                </View>
            </ScrollView>
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
    },

    custom: {
        alignItems: 'center',
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
        marginTop: 15,
        color: "#FAC503",
    },
    icon: {
        marginTop: 15,
        marginLeft: 25,
        maxHeight: 30,
        maxWidth: 30
    }

});

export default ProfilePage;




