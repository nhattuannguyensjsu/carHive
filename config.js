//firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//
const firebaseConfig = {
    apiKey: "AIzaSyCEqQ7efiO4x8CHongQ9d6QUK61NA9Pffc",
    authDomain: "carhive-c993a.firebaseapp.com",
    projectId: "carhive-c993a",
    storageBucket: "carhive-c993a.appspot.com",
    messagingSenderId: "243869331343",
    appId: "1:243869331343:web:263360395eba7f682a25fa"
  };

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase};
