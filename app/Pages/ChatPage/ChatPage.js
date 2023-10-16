// ChatPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import Goback from '../../../assets/icons/goback.png';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { height } = useWindowDimensions();

  const recipient = route.params.recipient;
  const currentUserEmail = FIREBASE_AUTH.currentUser.email;

  // Generate a unique chat ID using both user emails
  const chatId = [currentUserEmail, recipient].sort().join('-');

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const chatCollectionRef = collection(FIREBASE_DATABASE, 'chats');
        const chatQuery = query(
          chatCollectionRef,
          where('chatId', '==', chatId),
          orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
          const chatMessages = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data();
            const message = {
              _id: doc.id,
              text: docData.text,
              createdAt: docData.createdAt.toDate(),
              user: {
                _id: docData.user,
              },
            };
            chatMessages.push(message);
          });
          setMessages(chatMessages);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();
  }, [chatId]);

  const onSend = async (newMessages = []) => {
    try {
      const newMessage = newMessages[0];
      const docRef = await addDoc(collection(FIREBASE_DATABASE, 'chats'), {
        text: newMessage.text,
        user: newMessage.user._id,
        createdAt: newMessage.createdAt,
        chatId, // Store the chat ID in each message
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => navigation.navigate('Homepage')}
        style={{ padding: 5, backgroundColor: 'white' }}
      >
        <Image
          source={Goback}
          style={[styles.goback, { height: height * 0.05 }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.header}>Chat with {recipient}</Text>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: currentUserEmail,
        }}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  goback: {
    width: 30,
    height: 30,
    marginTop: 25,
    marginLeft: 20,
    marginRight: -10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
