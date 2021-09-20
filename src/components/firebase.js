
import firebase from "firebase"
import 'firebase/firestore';

  const firebaseApp = firebase.initializeApp({
     apiKey:"AIzaSyCT_kzBp-F-5AHSV2ig7cusOC7G4cSEw4w",
     authDomain: "stack-online.firebaseapp.com",
    projectId: "stack-online",
     storageBucket: "stack-online.appspot.com",
    messagingSenderId: "950055917473",
   appId: "1:950055917473:web:1fd1114325c7f650ca1de0",
    measurementId: "G-8P9SLPT7W7"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export  {db, auth, storage};