import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCO9lm7TAT-W757pmY_fT1xZIqb2kPQ_1A",
  authDomain: "food-delivery-backend-9cdf5.firebaseapp.com",
  projectId: "food-delivery-backend-9cdf5",
  databaseUrl:
    "https://food-delivery-backend-9cdf5-default-rtdb.firebaseio.com",
  storageBucket: "food-delivery-backend-9cdf5.appspot.com",
  messagingSenderId: "385448496698",
  appId: "1:385448496698:web:e0d7cd0878285f96126f03",
  measurementId: "G-S7CKGELNXB",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
