// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBZi00q_GMTpnzqqGzhXC9IMWb3Ahezn4U",
  authDomain: "imageupload-c7ab9.firebaseapp.com",
  projectId: "imageupload-c7ab9",
  storageBucket: "imageupload-c7ab9.appspot.com",
  messagingSenderId: "94483492698",
  appId: "1:94483492698:web:9b1b8a53ddb038388e8d63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)