import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();
const mountains = await fetch('mountains.json').then(response => response.json());

document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;

    const fjellListDiv = document.getElementById('fjell-list');
    fjellListDiv.innerHTML = mountains.map(mountain => `
      <div>
        <h3>${mountain.name}</h3>
        <p>Område: ${mountain.area}</p>
        <p>Høyde: ${mountain.height}</p>
        <button data-name="${mountain.name}">Merk som besteget</button>
      </div>
    `).join('');

    fjellListDiv.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const mountainName = e.target.dataset.name;
        updateDoc(doc(db, 'users', userId), {
          mountains: arrayUnion(mountainName),
          lastVisited: arrayUnion(mountainName)
        });
        e.target.innerText = 'Besteget';
        e.target.disabled = true;
      }
    });
  } else {
    window.location.href = 'login.html';
  }
});
