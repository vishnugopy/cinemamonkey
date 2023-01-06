import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKJx7lNrYce6evhsqfAnJP7KxqSaHHdOE",
  authDomain: "blog-37e69.firebaseapp.com",
  projectId: "blog-37e69",
  storageBucket: "blog-37e69.appspot.com",
  messagingSenderId: "778491868720",
  appId: "1:778491868720:web:868ae9c1acc9768f7b5ff5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
