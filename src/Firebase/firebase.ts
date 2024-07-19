import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import config from "../Config";

const firebaseConfig = {
  apiKey: config.firebaseApikey,
  authDomain: config.firebaseAuthDomain,
  projectId: config.firebaseProjectId,
  databaseURL: config.firebaseDatabaseUrl,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderId,
  appId: config.firebaseAppId,
  measurementId: config.firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, app, storage };
