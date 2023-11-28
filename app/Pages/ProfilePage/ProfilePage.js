import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable,
    useWindowDimensions, TouchableOpacity, TextInput} from 'react-native';
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
import { doc, collection, addDoc, getDoc, updateDoc, onSnapshot, getDocs, setDoc } from 'firebase/firestore';
import { firebase } from '../../../config';



const ProfilePage = () => {
    const { height } = useWindowDimensions();
    const Navigation = useNavigation();
    const [files, setFiles] = useState([]);

    const [userInfo, setUserInfo] = useState(null);
    const [newName, setNewName] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);

    const updateUserInfo = async () => {
        try {
          const user = FIREBASE_AUTH.currentUser;
    
          if (user) {
            const userRef = doc(collection(FIREBASE_DATABASE, 'usersInfo'), user.email);

            await updateDoc(userRef, {
                name: newName,
            });

            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                name: newName,
            }));

            setModalVisible(false);
            alert('Name updated successfully!');
        }
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};
    
      const forgotPassword = () => {
        try {
            const user = FIREBASE_AUTH.currentUser;
    
            if (user) {
                firebase.auth().sendPasswordResetEmail(user.email)
                    .then(() => {
                        alert("Password reset email sent");
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            }
        } catch (error) {
            console.error('Error sending password reset email:', error);
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
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.1 }]}
          resizeMode="contain"
        />
        <Text style={styles.title}> CarHive </Text>
      </View>
      <View style={styles.root}>
        <Image
          source={Profile}
          style={[styles.profile, { height: height * 0.1 }]}
          resizeMode="contain"
        />
      </View>

      <View>
        <View style={{ flexDirection: 'row', marginBottom: -40 }}>
          <Text style={styles.text_sub}>
            Name: {userInfo ? userInfo.name : ''}
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)} 
          >
            <Image
              source={Edit}
              style={[styles.subicon, { height: height * 0.1 }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text_sub}> Email: {userInfo ? userInfo.email : ''} </Text>
        <View style={{ flexDirection: 'row', marginBottom: -40 }}>
                    <Text style={styles.text_sub}> Password: ********** </Text>
                    <TouchableOpacity onPress={() => setPasswordModalVisible(true)}>
                        <Image
                            source={Lock}
                            style={[styles.subicon, { height: height * 0.1 }]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
      </View>

      {/* <View style={{ flexDirection: 'row' }}>
        <Image
          source={Listing}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.text_sub}> My Listing </Text>
      </View> */}

      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => Navigation.navigate('FavoritePage')}
      >
        <Image
          source={Fav}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.text_sub}> Favorites </Text>
      </TouchableOpacity>

      <View style={styles.custom}>
        <TouchableOpacity
          style={[styles.button]}
          activeOpacity={0.7}
          onPress={() => Navigation.navigate('UploadIDPage')}
        >
          <Text style={{ color: 'black', textAlign: 'center' }}>
            {' '}
            Upload ID Verification{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.custom}>
        <TouchableOpacity
          style={[styles.button]}
          activeOpacity={0.7}
          onPress={() => FIREBASE_AUTH.signOut()}
        >
          <Text style={{ color: 'black', textAlign: 'center' }}> Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter New Name:</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={(text) => setNewName(text)}
            />
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[styles.button, styles.modalButton]}
                onPress={() => {
                  setModalVisible(!isModalVisible);
                }}
              >
                <Text style={{ color: 'black', textAlign: 'center' }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.modalButton]}
                onPress={updateUserInfo}
              >
                <Text style={{ color: 'black', textAlign: 'center' }}>
                  Update Name
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
                animationType="slide"
                transparent={true}
                visible={isPasswordModalVisible}
                onRequestClose={() => {
                    setPasswordModalVisible(!isPasswordModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Are you sure you want to reset your password?
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.modalButton]}
                                onPress={() => {
                                    setPasswordModalVisible(!isPasswordModalVisible);
                                }}
                            >
                                <Text style={{ color: 'black', textAlign: 'center' }}>
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.modalButton]}
                                onPress={forgotPassword}
                            >
                                <Text style={{ color: 'black', textAlign: 'center' }}>
                                    Reset Password
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
        marginTop: 15,
        maxHeight: 30,
        maxWidth: 25
    },
    button: {
        backgroundColor: "#FFD43C",
        width: "60%",
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
    },
    inputContainer: {
        padding: 5,
        alignItems: 'center',
      },
      input: {
        height: 25,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 20
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      },
      modalView: {
        width: "90%",
        height: "18%",
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 20,
        padding: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 10,
        textAlign: 'center',
      },
      modalButton: {
        marginHorizontal: 10,
      },
});

export default ProfilePage;



