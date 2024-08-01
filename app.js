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
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("User registered:", userCredential.user);
        })
        .catch(error => {
            console.error("Error registering user:", error);
        });
});

// Logg inn bruker
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("User logged in:", userCredential.user);
        })
        .catch(error => {
            console.error("Error logging in user:", error);
        });
});

// Oppdater profil
document.getElementById('updateProfileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const newEmail = e.target.email.value;
    const newPassword = e.target.password.value;

    if (user) {
        if (newEmail) {
            user.updateEmail(newEmail).catch(error => {
                console.error("Error updating email:", error);
            });
        }
        if (newPassword) {
            user.updatePassword(newPassword).catch(error => {
                console.error("Error updating password:", error);
            });
        }
    }
});

// Slett profil
document.getElementById('deleteAccountButton').addEventListener('click', () => {
    const user = auth.currentUser;

    if (user) {
        user.delete().catch(error => {
            console.error("Error deleting user:", error);
        });
    }
});

// Laste inn data fra Firestore
function loadData() {
    const user = auth.currentUser;

    if (user) {
        // Hente data og oppdatere brukergrensesnittet
    }
}

// Event listeners for innlogging og autentisering
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User is signed in:", user);
        loadData();
    } else {
        console.log("No user is signed in.");
    }
});
document.addEventListener('DOMContentLoaded', () => {
    fetch('mountains.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data fetched successfully:", data);  // Legg til denne linjen for logging
            const tableBody = document.getElementById('mountainTable').getElementsByTagName('tbody')[0];
            data.forEach(mountain => {
                let row = tableBody.insertRow();
                let nameCell = row.insertCell(0);
                let areaCell = row.insertCell(1);
                let heightCell = row.insertCell(2);
                let climbedCell = row.insertCell(3);
                let commentsCell = row.insertCell(4);

                nameCell.textContent = mountain.name;
                areaCell.textContent = mountain.area;
                heightCell.textContent = mountain.height;
                climbedCell.textContent = mountain.climbed;
                commentsCell.textContent = mountain.comments;
            });
        })
        .catch(error => {
            console.error('Error fetching the mountains data:', error);
        });
});
