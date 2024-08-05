import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    const userRef = doc(db, 'users', user.uid);
    getDoc(userRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById('overview').innerHTML = `
          <p>Velkommen, ${userData.name}</p>
          <p>Du bor i ${userData.city}</p>
          <!-- Her kan du legge til mer brukerrelatert informasjon -->
        `;
      }
    });
  } else {
    window.location.href = 'login.html';
  }
});
