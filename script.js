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
const firebaseDb = getFirestore(app)
const auth = getAuth(app);

let SignUpForm = document.querySelector('.SignUpForm');          // Selektion des HTML-Elements mit der Klasse 'SignUpForm'

let EmailInput = SignUpForm.querySelector('#emailInput');                   // Selektion der Eingabefelder innerhalb des Formulars
let PasswordInput = SignUpForm.querySelector('#passwordInput');
let FullNameInput = SignUpForm.querySelector('#fullNameInput');

let RegisterUser = evt => {
    evt.preventDefault();       // Verhindern des Standardverhaltens des Formulars

    createUserWithEmailAndPassword(auth, EmailInput.value, PasswordInput.value)      // Erstellen eines Benutzers mit E-Mail und Passwort über das Firebase-Authentifizierungsmodul
        .then((userCredential)=>{
            const user = userCredential.user;
            set(ref(db, 'users/' + user.uid),{
                firstname: FullNameInput.value,
                email: EmailInput.value,
                registrationDate: new Date()
            });



            const usersRef = doc(firebaseDb, "users", user.uid);
            updateDoc(usersRef, {
                firstname: FullNameInput.value,
                email: EmailInput.value,
                registrationDate: new Date()
            })

            window.location.href = "https://noah-pesendorfer.github.io/Scrumflow-Projects/";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {            // Wenn der User eine Email eingibt, die bereits in Verwendung ist, kommt die entsprechende Alert
                alert("This email address is already registered. Please use a different one.");
            } else if (errorCode === "auth/weak-password") {            // Wenn der User ein Passwort eingibt, welches unter 6 characters ist, kommt die entsprechende Alert
                alert("Password should be at least 6 characters long. Please choose a stronger password.");
            } else {
                alert(errorMessage);
            }
        });
}

SignUpForm.addEventListener('submit', RegisterUser);