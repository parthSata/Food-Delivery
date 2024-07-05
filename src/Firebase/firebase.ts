import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Analytics } from "@vercel/analytics/react"

const firebaseConfig = {
  apiKey: "AIzaSyCO9lm7TAT-W757pmY_fT1xZIqb2kPQ_1A",
  authDomain: "food-delivery-backend-9cdf5.firebaseapp.com",
  projectId: "food-delivery-backend-9cdf5",
  databaseURL:
    "https://food-delivery-backend-9cdf5-default-rtdb.firebaseio.com",
  storageBucket: "food-delivery-backend-9cdf5.appspot.com",
  messagingSenderId: "385448496698",
  appId: "1:385448496698:web:e0d7cd0878285f96126f03",
  measurementId: "G-S7CKGELNXB",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth, app, storage };
