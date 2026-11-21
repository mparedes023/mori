import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB4WFQCwpCuBsRkLllXO8mbBJV4tzwSFNk",
  authDomain: "mori-bb1e2.firebaseapp.com",
  projectId: "mori-bb1e2",
  storageBucket: "mori-bb1e2.firebasestorage.app",
  messagingSenderId: "251699339789",
  appId: "1:251699339789:web:f78de96b6a576d72aa6b44",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
