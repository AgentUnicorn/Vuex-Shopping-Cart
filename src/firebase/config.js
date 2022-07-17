import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN5qngrUP-PkWaOkf3lBBVrBMtk0qpagk",
  authDomain: "vue-shopping-cart-auth.firebaseapp.com",
  projectId: "vue-shopping-cart-auth",
  storageBucket: "vue-shopping-cart-auth.appspot.com",
  messagingSenderId: "937667627309",
  appId: "1:937667627309:web:304b2243b927cd7ea22ba4",
};

// init firebase 
const app = initializeApp(firebaseConfig);

// init firebase auth
const auth = getAuth();
const db = getFirestore(app);

export { auth, db };