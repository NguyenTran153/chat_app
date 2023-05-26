import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBnXk5miMdkr_Z38A6cTo28qheG1TI-fD8",
  authDomain: "messenger-clone-954a0.firebaseapp.com",
  projectId: "messenger-clone-954a0",
  storageBucket: "messenger-clone-954a0.appspot.com",
  messagingSenderId: "306660160397",
  appId: "1:306660160397:web:0ad962f2b95096556d43c4",
}).auth();
