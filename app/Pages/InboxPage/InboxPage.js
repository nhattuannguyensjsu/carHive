import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../firebaseConfig';

export default function InboxPage() {
  const [userList, setUserList] = useState([]);
  const Navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(FIREBASE_DATABASE, 'chats'),
        where('recipient', '==', FIREBASE_AUTH?.currentUser?.email)
      ),
      (querySnapshot) => {
        const users = new Set();
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData.user !== FIREBASE_AUTH?.currentUser?.email) {
            users.add(docData.user);
          }
        });
        setUserList(Array.from(users));
      }
    );

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inbox</Text>
      <FlatList
        data={userList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => Navigation.navigate('ChatPage', { recipient: item })}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  userItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});
