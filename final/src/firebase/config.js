import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDdN1sh49okCp0or1YBNrWwrLTn3vfKm5w",
  authDomain: "finalprog-8cace.firebaseapp.com",
  projectId: "finalprog-8cace",
  storageBucket: "finalprog-8cace.firebasestorage.app",
  messagingSenderId: "862122790527",
  appId: "1:862122790527:web:e9f72aafe5094e6b98f94a"
};


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

