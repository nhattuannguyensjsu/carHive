import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import Logo from '../../../assets/images/logo.png';
import Goback from '../../../assets/icons/goback.png';

import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const FavoritePage = () => {
  const { height } = useWindowDimensions();
  const Navigation = useNavigation();
  const [favoriteListings, setFavoriteListings] = useState([]);

  useEffect(() => {
    const fetchFavoriteListings = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;

        const favoritesCollection = collection(
          FIREBASE_DATABASE,
          'favorites',
          user.email,
          'FavoriteListings'
        );

        const favoritesQuery = onSnapshot(favoritesCollection, (snapshot) => {
          const favorites = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setFavoriteListings(favorites);
        });

        return () => favoritesQuery();
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

    fetchFavoriteListings();
  }, []);

  const removeFromFavorites = async (listing) => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      const favoritesCollection = collection(
        FIREBASE_DATABASE,
        'favorites',
        user.email,
        'FavoriteListings'
      );

      // Find the document reference based on the listing's id
      const listingRef = doc(favoritesCollection, listing.id);

      // Remove the listing from favorites
      await deleteDoc(listingRef);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => Navigation.navigate('Homepage')}>
          <Image source={Goback} style={[styles.goback, { height: height * 0.05 }]} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={Logo} style={[styles.logo, { height: height * 0.1 }]} resizeMode="contain" />
        <Text style={styles.title}> CarHive </Text>
      </View>

      <View>
        <Text style={styles.text}> My Favorites </Text>
      </View>

      <FlatList
        data={favoriteListings}
        keyExtractor={(item) => item.id}
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
              <View style={styles.listingContent}>
                <Text style={styles.listingTitle}>{item.Title}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromFavorites(item)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
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
    marginTop: '-10%',
  },
  text: {
    fontSize: 25,
    textAlign: 'left',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  logo: {
    marginLeft: 20,
    width: '20%',
  },
  title: {
    fontSize: 30,
    marginTop: 25,
    color: '#FAC503',
    marginBottom: 10,
  },
  goback: {
    width: 30,
    height: 30,
    marginTop: 25,
    marginLeft: 20,
    marginRight: -10,
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
  listingContent: {
    padding: 10,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 100,
    alignSelf: 'center'
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FavoritePage;
