import  { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
    apiKey: "AIzaSyBdbqoJLSoYiFIOUECteUdrpLLRuSPLtAU",
    authDomain: "m150-shop.firebaseapp.com",
    projectId: "m150-shop",
    storageBucket: "m150-shop.appspot.com",
    messagingSenderId: "147834709976",
    appId: "1:147834709976:web:c07a3d89f716597e68f4ad"
})

export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app;