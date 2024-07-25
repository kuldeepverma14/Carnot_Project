import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDn0gXwAadHKkWerNeb5488OAyuypqSf1M",
    authDomain: "book-store-app-ab08f.firebaseapp.com",
    projectId: "book-store-app-ab08f",
    storageBucket: "book-store-app-ab08f.appspot.com",
    messagingSenderId: "534935890121",
    appId: "1:534935890121:web:754d6fb3e23a03b9260518",
    databaseURL:"https://book-store-app-ab08f-default-rtdb.firebaseio.com"
};
export const FireAuth = initializeApp(firebaseConfig)