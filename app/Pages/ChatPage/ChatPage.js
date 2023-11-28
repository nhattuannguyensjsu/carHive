import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, useWindowDimensions } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE } from '../../../firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Goback from '../../../assets/icons/goback.png';
import addImage from '../../../assets/icons/add-image.png';
import profileImage from '../../../assets/icons/profile.png';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import InboxPage from '../InboxPage/InboxPage';
import { AlanView } from '@alan-ai/alan-sdk-react-native';
import { NativeEventEmitter, NativeModules } from 'react-native';


export default function ChatPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { height } = useWindowDimensions();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [pickedImage, setPickedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const recipient = route.params.recipient;
  const currentUserEmail = FIREBASE_AUTH.currentUser.email;

  const { AlanManager, AlanEventEmitter } = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setPickedImage(selectedAsset.uri); // Set the URI directly
      }
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
              ...(docData.image && { image: docData.image }),
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

  async function onSend(newMessages = []) {
    try {
      const newMessage = newMessages[0];
      if (!newMessage) {
        return;
      }

      if (newMessage.text) {
        // Send text message
        console.log('Starting send text...');
        setLoading(true);
        const startTime = performance.now();
        await addDoc(collection(FIREBASE_DATABASE, 'chats'), {
          text: newMessage.text,
          user: newMessage.user._id,
          createdAt: newMessage.createdAt,
          recipient: recipient,
        });
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        console.log(`Send text completed in ${elapsedTime} ms`);
      }

      if (pickedImage) {
        console.log('Starting send image...');
        setLoading(true);
        const startTime = performance.now();
        // Send image message
        const imageURI = pickedImage;
        const storageRef = ref(FIREBASE_STORAGE, `ChatImages/${new Date().getTime()}`);
        const imageBlob = await fetch(imageURI).then((response) => response.blob());
        const uploadTask = uploadBytesResumable(storageRef, imageBlob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error('Error uploading image:', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log("File available at", downloadURL);
              // Save the image URL in the database
              await addDoc(collection(FIREBASE_DATABASE, 'chats'), {
                image: downloadURL,
                user: newMessage.user._id,
                createdAt: newMessage.createdAt,
                recipient: recipient,
              });
              const endTime = performance.now();
              const elapsedTime = endTime - startTime;
              console.log(`Send image completed in ${elapsedTime} ms`);
            });
          }
        );

        setPickedImage(null); // Reset pickedImage after sending
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  const handleAlanCommand = (data) => {
    if (data.command === 'send_message') {
      const { message } = data.data;
      setInputText(message);
    }
  };

  useEffect(() => {
    alanEventEmitter.addListener('command', handleAlanCommand);
    return () => {
      alanEventEmitter.removeAllListeners('command');
    };

}, []);


  return (
    <React.Fragment>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
        text={inputText} 
        onInputTextChanged={(text) => setInputText(text)} 
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
        <Image source={{ uri: pickedImage }} style={styles.pickedImage} resizeMode="contain" />
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