import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig = {
  apiKey: "AIzaSyCtoDo0IwhtxL5Lb6gbsNrxWuHjC5TFz_A",
  authDomain: "graphiql-client.firebaseapp.com",
  projectId: "graphiql-client",
  storageBucket: "graphiql-client.appspot.com",
  messagingSenderId: "610480243273",
  appId: "1:610480243273:web:3c7a078150f4bd0c7af598",
  measurementId: "G-7MJEXL5Q7J"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;
export { app, auth, analytics };
export const db = getFirestore(app);
