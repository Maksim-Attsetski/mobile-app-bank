import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAEu-WViAynD7GcRdN7-2_NFboDOqxyXJE',
  authDomain: 'bank-mobile-e79bc.firebaseapp.com',
  projectId: 'bank-mobile-e79bc',
  storageBucket: 'bank-mobile-e79bc.appspot.com',
  messagingSenderId: '566796193662',
  appId: '1:566796193662:web:16eeeda5ec2ee9038aad2f',
  measurementId: 'G-FGP2TM94FV',
};

firebase.initializeApp(firebaseConfig);
// const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics();
export const firebaseAuth = getAuth();
export const fs = getFirestore();

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(firebaseAuth, email, password);
export const login = (email: string, password: string) => signInWithEmailAndPassword(firebaseAuth, email, password);
export const logout = () => signOut(firebaseAuth);
