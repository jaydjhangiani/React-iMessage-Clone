import firebase from "firebase";

const firebaseConfig = {
  // your firebase credentials go here
   apiKey: "AIzaSyC0kZoJU65_RApyZv9mDKwaWJxITEcbRiA",
    authDomain: "jj-imessage.firebaseapp.com",
    databaseURL: "https://jj-imessage.firebaseio.com",
    projectId: "jj-imessage",
    storageBucket: "jj-imessage.appspot.com",
    messagingSenderId: "28998468098",
    appId: "1:28998468098:web:f55c48015e0fa046235d1b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
