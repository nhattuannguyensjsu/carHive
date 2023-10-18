import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, useWindowDimensions, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Goback from '../../../assets/icons/goback.png';
import addImage from '../../../assets/icons/add-image.png';

import profileImage from '../../../assets/icons/profile.png';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { height } = useWindowDimensions();
  const [pickedImage, setPickedImage] = useState("");

  const recipient = route.params.recipient;
  const currentUserEmail = FIREBASE_AUTH.currentUser.email;

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  }

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const chatCollectionRef = collection(FIREBASE_DATABASE, 'chats');
        const chatQuery = query(
          chatCollectionRef,
          where('user', 'in', [currentUserEmail, recipient]),
          where('recipient', 'in', [currentUserEmail, recipient]),
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
                avatar: profileImage,
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
  }, [recipient, currentUserEmail]);

  const onSend = async (newMessages = []) => {
    try {
      const newMessage = newMessages[0];
      if (!newMessage || !newMessage.text) {
        return;
      }

      const docRef = await addDoc(collection(FIREBASE_DATABASE, 'chats'), {
        text: newMessage.text,
        user: newMessage.user._id,
        createdAt: newMessage.createdAt,
        recipient: recipient,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <React.Fragment>
        <TouchableOpacity
          onPress={() => navigation.navigate('Homepage')}
          style={{ padding: 5, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}
        >
          <Image
            source={Goback}
            style={[styles.goback, { height: height * 0.05 }]}
            resizeMode="contain"
          />
          <Text style={styles.userEmail}>{recipient}</Text>
        </TouchableOpacity>

        <GiftedChat
          messages={messages}
          onSend={onSend}
          renderActions={() => (
            <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
              <Image
                source={addImage}
                style={[styles.addImage, { height: height * 0.05 }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          user={{
            _id: currentUserEmail,
          }}
        />
      </React.Fragment>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  goback: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginRight: 10,
  },
  addImage: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: 10,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
