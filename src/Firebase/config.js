import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9i7bogmKSkAu_eB0CqY2xLtUtBEZKGvY",
  authDomain: "bookstore-ea5f3.firebaseapp.com",
  databaseURL: "https://bookstore-ea5f3-default-rtdb.firebaseio.com",
  projectId: "bookstore-ea5f3",
  storageBucket: "bookstore-ea5f3.appspot.com",
  messagingSenderId: "678045471115",
  appId: "1:678045471115:web:8610d73f1a46e4d8971f8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Base de datos
export const db =  getFirestore(app)
// Auth
export const auth =  getAuth(app)