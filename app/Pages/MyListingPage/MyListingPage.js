import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../firebaseConfig';
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  addDoc
} from 'firebase/firestore';

const MyListingPage = () => {
  const { height } = useWindowDimensions();
  const Navigation = useNavigation();
  const [userListings, setUserListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [pendingSoldListing, setPendingSoldListing] = useState(null);

  const getListingInfo = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
  
      if (!user) {
        return;
      }
  
      const listingsCollection = collection(FIREBASE_DATABASE, 'usersListing');
      const q = query(listingsCollection, where('Email', '==', user.email));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userSpecificListings = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            Title: data.Title,
            imageURL: data.imageURL,
            Price: data.Price,
            status: data.status, 
            Email: data.Email,
            Year: data.Year,
            Color: data.Color,
            Mileage: data.Mileage,
            Location: data.Location,
            Zipcode: data.Zipcode,
            VIN: data.VIN,
            Description: data.Description,
            isSold: data.status === 'sold',

          };
        });
        setUserListings(userSpecificListings);
      });
       
      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };
  

  const handleMarkAsSold = (listing) => {
    setPendingSoldListing(listing);
    setConfirmationModalVisible(true);
  };


  const confirmMarkAsSold = async () => {
    try {
      if (pendingSoldListing) {
        const listingDocRef = doc(
          FIREBASE_DATABASE,
          'usersListing',
          pendingSoldListing.id
        );
  
        const newStatus = pendingSoldListing.isSold ? 'unsold' : 'sold';
        await updateDoc(listingDocRef, {
          status: newStatus,
        });
  
        const updatedUserListings = userListings.map((item) =>
          item.id === pendingSoldListing.id
            ? { ...item, status: newStatus, isSold: !item.isSold }
            : item
        );
  
        setUserListings(updatedUserListings);
  
        setPendingSoldListing(null);
        setConfirmationModalVisible(false);
  
        if (newStatus === 'sold') {
          Navigation.navigate('FeedbackPage');
        }
      }
    } catch (error) {
      console.error('Error marking listing:', error);
    }
  };  
  
    useEffect(() => {
      const unsubscribe = getListingInfo();
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

                <View>
                    <Text style={styles.text}> My Listings </Text>
                </View>
  
                <FlatList
  data={userListings}
  keyExtractor={(item, index) => `${item.id}-${index}-${userListings ? 'filtered' : 'all'}`}
  numColumns={2}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.listingContainer}
      onPress={() => {
        Navigation.navigate('ListingPage', { listingData: item });
      }}
    >
      <View style={styles.listingPair}>
        <Image source={{ uri: item.imageURL }} style={styles.listingImage} resizeMode="cover" />
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => handleMarkAsSold(item)}
        >
          <Text style={styles.buttonText}>
            {item.isSold ? 'Mark Unsold' : 'Mark Sold'}
          </Text>
        </TouchableOpacity>
        <View style={styles.listingContent}>
          <Text style={styles.listingTitle}>{item.Title}</Text>
          <Text style={styles.listingStatus}>
            Status: {item.status === 'sold' ? 'Sold' : 'Available'}
          </Text>
          <Text style={styles.listingPrice}>${item.Price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
/>
  
  <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationModalVisible}
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Confirm Marking as Sold?</Text>
            <Pressable
              style={[styles.modalButton, styles.confirmButton]}
              onPress={confirmMarkAsSold}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setConfirmationModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "white",
      marginTop: "-10%",
      marginBottom: "15%"
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
    marginTop: 5,
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
listingPrice: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -10,
    textAlign: 'right'
},
    listingContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    favoritesButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: "#FFD43C",
      padding: 1,
      zIndex: 1,
      padding: 5,
      marginVertical: 5,
      borderRadius: 20,
    },
    buttonText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 12,
    },
    favoritesIcon: {
      maxHeight: 30,
      maxWidth: 30,
    },
    text: {
      fontSize: 25,
      textAlign: 'left',
      marginLeft: 30,
      fontWeight: 'bold'
      },

      button: {
        backgroundColor: "#FFD43C",
        width: 60,
        padding: 5,
        marginVertical: 5,
        borderRadius: 20,
        marginTop: -5,
      },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: "#FFD43C",
    borderRadius: 20

  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 20
  },
 
  listingStatus: {
    marginLeft: 10,
    marginBottom: 10
  }
  });
  
  export default MyListingPage;
