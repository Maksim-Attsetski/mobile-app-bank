import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQGGij54RyI3ajWal_y4TslgQJ0yYDp6Q",
  authDomain: "mobile-app-bank.firebaseapp.com",
  projectId: "mobile-app-bank",
  storageBucket: "mobile-app-bank.appspot.com",
  messagingSenderId: "610171750064",
  appId: "1:610171750064:web:8d858b2b634b10a626dd75",
  measurementId: "G-WYKL7H2WJ7"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);