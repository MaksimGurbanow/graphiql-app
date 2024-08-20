import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";


export const firebaseConfig = {
  apiKey: "AIzaSyCtoDo0IwhtxL5Lb6gbsNrxWuHjC5TFz_A",
  authDomain: "graphiql-client.firebaseapp.com",
  projectId: "graphiql-client",
  storageBucket: "graphiql-client.appspot.com",
  messagingSenderId: "610480243273",
  appId: "1:610480243273:web:3c7a078150f4bd0c7af598",
  measurementId: "G-7MJEXL5Q7J"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
