import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput} from 'react-native';
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
import { doc, collection, getDoc, updateDoc, onSnapshot, getDocs, setDoc } from 'firebase/firestore';



const ProfilePage = () => {
    const { height } = useWindowDimensions();
    const Navigation = useNavigation();
    const [files, setFiles] = useState([]);

    const [userInfo, setUserInfo] = useState(null);

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
  
    const updateUserInfo = async () => {
        try {
          const user = FIREBASE_AUTH.currentUser;
      
          if (user) {
            // Use the user's email as the document ID
            const userRef = doc(collection(FIREBASE_DATABASE, "usersInfo"), user.email);
      
            // Update the Firestore document
            await setDoc(userRef, {
              name: newName,
              email: newEmail,
            });
      
            // Update the local state
            setUserInfo({
              name: newName,
              email: newEmail,
            });
      
            alert('Name and Email updated successfully!');
          }
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      };
      
      

    const getUserInfo = async () => {
        try {
            const user = FIREBASE_AUTH.currentUser;

            if (user) {
                const querySnapshot = await getDocs(collection(FIREBASE_DATABASE, "usersInfo"));
                const userData = [];
                querySnapshot.forEach((doc) => {
                    userData.push(doc.data());
                });

                const foundUser = userData.find((userDataItem) => userDataItem.email === user.email);
                if (foundUser) {
                    setUserInfo({
                        name: foundUser.name,
                        email: foundUser.email
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        getUserInfo();

        const collectionRef = collection(FIREBASE_DATABASE, "users");

        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const updatedData = [];

            snapshot.docChanges().forEach((change) => {
                if (change.type === "added" || change.type === "modified") {
                    updatedData.push(change.doc.data());
                } else if (change.type === "removed") {
                }
            });

            setFiles(updatedData);
        });

        return () => unsubscribe();
    }, []);
    return (
        <SafeAreaView style={styles.safe}>
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
                        />

                    </View>
                    <Text style={styles.text_sub}>  Email:  {userInfo ? userInfo.email : ''}   </Text>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.text_sub}>  Password:   **********  </Text>
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

            


                <TouchableOpacity style={{ flexDirection: 'row' }}
                onPress={() => Navigation.navigate('FavoritePage')}>
                    
                    <Image source={Fav} style={styles.icon}
                        resizeMode="contain"
                    />
                    <Text style={styles.text_sub}> Favorites </Text>

                </TouchableOpacity>

                <View style={styles.custom}>
                    <TouchableOpacity
                        style={[styles.button]}
                        activeOpacity={0.7}
                        onPress={() => Navigation.navigate('UploadIDPage')}>
                        <Text style={{ color: 'black', textAlign: 'center' }}> Upload ID Verification </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
        <Text>Enter new name:</Text>
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={text => setNewName(text)}
        />
        <Text>Enter new email:</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={text => setNewEmail(text)}
        />
        <TouchableOpacity
          style={[styles.button]}
          activeOpacity={0.7}
          onPress={updateUserInfo}>
          <Text style={{ color: 'black', textAlign: 'center' }}> Update Name and Email </Text>
        </TouchableOpacity>
      </View>


                <View style={styles.custom}>
                    <TouchableOpacity
                        style={[styles.button]}
                        activeOpacity={0.7}
                        onPress={() => FIREBASE_AUTH.signOut()}>
                        <Text style={{ color: 'black', textAlign: 'center' }}> Logout</Text>

                    </TouchableOpacity>
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
        marginTop: "-10%"
    },
    custom: {
        alignItems: 'center',
        marginTop: -10
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
        maxHeight: 15,
        maxWidth: 20
    },
    button: {
        backgroundColor: "#FFD43C",
        width: "60%",
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
    },
    inputContainer: {
        padding: 5,
        alignItems: 'center',
      },
      input: {
        height: 15,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5,
        paddingHorizontal: 8,
        width: '80%',
      },
});

export default ProfilePage;




