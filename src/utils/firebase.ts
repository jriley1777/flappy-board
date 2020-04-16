import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "processing-editor.firebaseapp.com",
  databaseURL: "https://processing-editor.firebaseio.com",
  projectId: "processing-editor",
  storageBucket: "processing-editor.appspot.com",
  messagingSenderId: "696014880400",
  appId: "1:696014880400:web:9c73b951a1dd28e521e215",
  measurementId: "G-TFRMQDCJ24",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const DB = {
    MESSAGES: 'messages'
};

export default firebase;