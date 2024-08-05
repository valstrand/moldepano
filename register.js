import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const city = document.getElementById('city').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        city,
      });
    })
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      document.getElementById('error').innerText = error.message;
    });
});
