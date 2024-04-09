import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZJTH0Znyi13etPM6Ag5M-lQ_WeqXOIsU",
    authDomain: "scrumflow-6e479.firebaseapp.com",
    projectId: "scrumflow-6e479",
    storageBucket: "scrumflow-6e479.appspot.com",
    messagingSenderId: "828323679259",
    appId: "1:828323679259:web:6db3cfbf89942cc3d4fcbe",
    measurementId: "G-2427QNHC73"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);

let EmailInput = document.getElementById('email');
let PasswordInput = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let FullNameInput = document.getElementById('name');
document.getElementById('signUp').addEventListener('click', function(event) {
    event.preventDefault();
    if(PasswordInput.value === confirmPassword.value) {
        createUserWithEmailAndPassword(auth, EmailInput.value, PasswordInput.value)
            .then((userCredential) => {
                const user = userCredential.user;
                const userRef = collection(db, "users")
                set(ref(db, 'users/' + user.uid), {
                    name: FullNameInput.value,
                    email: EmailInput.value,
                    registrationDate: new Date()
                });
                console.log(user);

                window.location.href = "https://noah-pesendorfer.github.io/Scrumflow-Home/";


            })
            .catch((error) => {
                const errorMessage = error.message;

                console.log(errorMessage);
            })
    }
    else{
        alert("Password != confirm");
    }
}) ;
