import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, GoogleAuthProvider,signInWithPopup, } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { getFirestore, collection, addDoc,getDocs ,getDoc,doc,updateDoc,serverTimestamp , arrayUnion, arrayRemove ,deleteDoc , setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyDrdGl0QdS_aakBYKV9sJClbkHBpRRZ3IU",
  authDomain: "updated-data-2a369.firebaseapp.com",
  projectId: "updated-data-2a369",
  storageBucket: "updated-data-2a369.firebasestorage.app",
  messagingSenderId: "549770779259",
  appId: "1:549770779259:web:61b60c9073deaad07320de"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);
  export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,getFirestore,db ,collection, addDoc,getDocs,getDoc, doc ,updateDoc,serverTimestamp, arrayUnion, arrayRemove,deleteDoc , setDoc }