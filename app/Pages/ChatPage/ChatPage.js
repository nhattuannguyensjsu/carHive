import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, useWindowDimensions } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Goback from '../../../assets/icons/goback.png';
import addImage from '../../../assets/icons/add-image.png';
import profileImage from '../../../assets/icons/profile.png';

export default function ChatPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { height } = useWindowDimensions();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [pickedImage, setPickedImage] = useState(null);

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
      const selectedAsset = result.assets[0];
      setPickedImage({
        _id: new Date().getTime(),
        image: selectedAsset.uri,
        createdAt: new Date(),
        user: {
          _id: currentUserEmail,
          avatar: profileImage,
        },
      });
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
      {pickedImage && (
        <Image source={{ uri: pickedImage.image }} style={styles.pickedImage} resizeMode="contain" />
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  goback: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginRight: 10,
  },
  inputContainer: {
    borderColor: 'transparent',
  },
  userEmail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addImage: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: 10,
  },
  pickedImage: {
    width: 100,
    height: 100,
    marginLeft: 20
  },
  sendButtonText: {
    fontWeight: 'bold',
    marginRight: 20,
    marginTop: -30,
    color: 'blue'
  }
});
