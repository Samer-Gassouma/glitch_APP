import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCjWIZToi5mzvFWeOynRpEOWQyMYjmLnE",
  authDomain: "glitch-b2794.firebaseapp.com",
  databaseURL: "https://glitch-b2794-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "glitch-b2794",
  storageBucket: "glitch-b2794.appspot.com",
  messagingSenderId: "124197801380",
  appId: "1:124197801380:web:3805e52729963b12a6c531"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
