// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAWahFzqJwBt43aH7s2PIwma9z7iOzD-zE",
  authDomain: "expense-tracker-bf436.firebaseapp.com",
  projectId: "expense-tracker-bf436",
  storageBucket: "expense-tracker-bf436.firebasestorage.app",
  messagingSenderId: "729216938270",
  appId: "1:729216938270:web:28517aad5848b8a30ed90f",
  measurementId: "G-1Z1CYXCVF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// isSupported().then((supported) => {
//   if (supported) {
//     const analytics = getAnalytics(app);
//   }
// });

//auth
export const authenticate = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage),
})

export const firestore = getFirestore(app);