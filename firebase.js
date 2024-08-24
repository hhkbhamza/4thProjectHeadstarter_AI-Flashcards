// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9YjBMIr9uFdgm_KHMKZ3Xhf7D04A2ZrI",
  authDomain: "flashcardsaas-349ba.firebaseapp.com",
  projectId: "flashcardsaas-349ba",
  storageBucket: "flashcardsaas-349ba.appspot.com",
  messagingSenderId: "889568169811",
  appId: "1:889568169811:web:af307ab68bde7a7a1f1ba6",
  measurementId: "G-YE5GRFWQNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}