import firebase from "firebase";
import "firebase/firestore";

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA1kWJxuJhi_jMv6Yk4U0dx3WpmufjXJlM",
  authDomain: "getfit-df50e.firebaseapp.com",
  projectId: "getfit-df50e",
  storageBucket: "getfit-df50e.appspot.com",
  messagingSenderId: "109958742407",
  appId: "1:109958742407:web:cf0b0211e90f5b944c5322"
});
//firebase.functions()
export default firebase.firestore();