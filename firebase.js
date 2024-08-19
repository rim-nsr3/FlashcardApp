// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcBY4lOuR4zL27-RUlgNJvTh0ceKcsiPc",
  authDomain: "flashcardsaas-22220.firebaseapp.com",
  projectId: "flashcardsaas-22220",
  storageBucket: "flashcardsaas-22220.appspot.com",
  messagingSenderId: "939353296263",
  appId: "1:939353296263:web:7ca0503d43a0df2adb1722",
  measurementId: "G-TKCK5KRZS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}