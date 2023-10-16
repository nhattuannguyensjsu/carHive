import { FIREBASE_APP } from "../firebaseConfig";

export const SignUpUser = async (email, password) => {

    if (email !== '' && password !== '') {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => alert('Sucessfullt registered!!!'))
            .catch((err) => alert("Sign Up Error!!!", err.message));
    }
};