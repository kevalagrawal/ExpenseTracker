import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();
// import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
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