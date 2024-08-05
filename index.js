import { getAuth, signOut, onAuthStateChanged } from firebaseauth;
import { getFirestore, doc, getDoc, collection, query, orderBy, limit, getDocs } from firebasefirestore;

const auth = getAuth();
const db = getFirestore();

document.getElementById('logout').addEventListener('click', () = {
  signOut(auth).then(() = {
    window.location.href = 'login.html';
  });
});

onAuthStateChanged(auth, (user) = {
  if (user) {
    const userId = user.uid;
    const userRef = doc(db, 'users', userId);

    getDoc(userRef).then((doc) = {
      if (doc.exists()) {
        const userData = doc.data();
        document.getElementById('overview').innerHTML = `
          pVelkommen, ${userData.name}!p
          pDu har gått ${userData.mountains.length}222 fjell.p
          h3Dine siste 5 fjellh3
          ul${userData.lastVisited.slice(-5).map(m = `li${m}li`).join('')}ul
        `;
        
         Hent de 5 mest besøkte fjellene
        const mountainsRef = collection(db, 'mountains');
        const q = query(mountainsRef, orderBy('visits', 'desc'), limit(5));
        getDocs(q).then((querySnapshot) = {
          const popularMountains = [];
          querySnapshot.forEach((doc) = {
            popularMountains.push(doc.data().name);
          });
          document.getElementById('overview').innerHTML += `
            h3Mest besøkte fjellh3
            ul${popularMountains.map(m = `li${m}li`).join('')}ul
          `;
        });
      }
    });
  } else {
    window.location.href = 'login.html';
  }
});
