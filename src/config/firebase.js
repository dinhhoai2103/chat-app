import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgysvyRzOAJyc5vquMbTZqwFw7KgqZpdc",
  authDomain: "chat-app-15003.firebaseapp.com",
  projectId: "chat-app-15003",
  storageBucket: "chat-app-15003.appspot.com",
  messagingSenderId: "451323260759",
  appId: "1:451323260759:web:372900c06ef31b7506d812",
  measurementId: "G-BZ4ZE51RW5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth };
