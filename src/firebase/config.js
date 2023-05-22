import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj0pSlbGmAoYZNTXZvHUWN4V4NQ8Ky_TU",
  authDomain: "miniblog-5d7c4.firebaseapp.com",
  projectId: "miniblog-5d7c4",
  storageBucket: "miniblog-5d7c4.appspot.com",
  messagingSenderId: "666439885511",
  appId: "1:666439885511:web:62a5a3cd807f0fa07b54e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 

export { db };  // exportando o banco de dados