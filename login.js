import { getAuth, signInWithEmailAndPassword } from firebaseauth;

const auth = getAuth();

document.getElementById('loginForm').addEventListener('submit', (e) = {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) = {
      window.location.href = 'index.html';
    })
    .catch((error) = {
      document.getElementById('error').innerText = error.message;
    });
});
