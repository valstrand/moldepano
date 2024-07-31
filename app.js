// Initialiser Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Registrer bruker
function registerUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("User registered:", userCredential.user);
        })
        .catch(error => {
            console.error("Error registering user:", error);
        });
}

// Logg inn bruker
function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("User logged in:", userCredential.user);
        })
        .catch(error => {
            console.error("Error logging in user:", error);
        });
}

// Lagre fjellstatus for bruker
function saveMountainStatus(userId, mountainId, status) {
    db.collection("users").doc(userId).collection("mountains").doc(mountainId).set({
        status: status
    })
    .then(() => {
        console.log("Mountain status saved");
    })
    .catch(error => {
        console.error("Error saving mountain status:", error);
    });
}