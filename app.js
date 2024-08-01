// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC70M9YYtgi0WWjzua6OAr5mX6OPktCo0I",
  authDomain: "moldepano.firebaseapp.com",
  projectId: "moldepano",
  storageBucket: "moldepano.appspot.com",
  messagingSenderId: "41942139320",
  appId: "1:41942139320:web:bcd9c87e05b9f5f3af4f4d",
  measurementId: "G-YDYHHCZNL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', () => {
    fetch('mountains.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data fetched successfully:", data);  // Logg for feilsøking
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
