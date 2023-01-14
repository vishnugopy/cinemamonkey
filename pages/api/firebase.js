import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeH0E-De1wKAlgczihQqXQ6G8Wr2mXx6g",
  authDomain: "cinema-715d3.firebaseapp.com",
  projectId: "cinema-715d3",
  storageBucket: "cinema-715d3.appspot.com",
  messagingSenderId: "140997643875",
  appId: "1:140997643875:web:c131cd5c380a4c40713256",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
