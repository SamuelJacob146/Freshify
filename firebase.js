// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsV8HPezF6fjmRpZj4MlluSBdTU7jT7w0",
  authDomain: "freshify-9b87a.firebaseapp.com",
  projectId: "freshify-9b87a",
  storageBucket: "freshify-9b87a.firebasestorage.app",
  messagingSenderId: "686593380494",
  appId: "1:686593380494:web:5e13776ef2962cf12439df",
  measurementId: "G-0LWR8FCTD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
export const db = getFirestore(app);