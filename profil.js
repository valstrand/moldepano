import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    const userRef = doc(db, 'users', userId);

    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        document.getElementById('profile-info').innerHTML = `
          <p>Navn: ${userData.name}</p>
          <p>Epost: ${userData.email}</p>
          <p>By: ${userData.city}</p>
        `;
      }
    });
  } else {
    window.location.href = 'login.html';
  }
});
