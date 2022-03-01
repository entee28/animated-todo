// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEd-CobcPT3_5tv1Y0FEyuiszY48iuweo",
    authDomain: "animated-todo-8af58.firebaseapp.com",
    projectId: "animated-todo-8af58",
    storageBucket: "animated-todo-8af58.appspot.com",
    messagingSenderId: "154792484204",
    appId: "1:154792484204:web:adb105d195bb985c5f2749"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app