import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsk5sR3_Px6EVl2wtq-U1-1DsVkUDZino",
  authDomain: "drop-box-fe3e4.firebaseapp.com",
  projectId: "drop-box-fe3e4",
  storageBucket: "drop-box-fe3e4.appspot.com",
  messagingSenderId: "641432271651",
  appId: "1:641432271651:web:d42ba4c426ddb67f8bea96",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
