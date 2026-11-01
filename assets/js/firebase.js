// assets/js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// TEMPELKAN KODE KONFIGURASI DARI FIREBASE CONSOLE DI SINI:
  const firebaseConfig = {
    apiKey: "AIzaSyAP7bxpTTo71Fpv-P_Rz8QljzBWNIH80bw",
    authDomain: "dashboard-laundry-b9cf7.firebaseapp.com",
    projectId: "dashboard-laundry-b9cf7",
    storageBucket: "dashboard-laundry-b9cf7.firebasestorage.app",
    messagingSenderId: "639963107225",
    appId: "1:639963107225:web:b0d86307f5318f7e2fcd08",
    measurementId: "G-E8VNVV8PC8"
  };

// Inisialisasi Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ekspor agar bisa dipanggil di halaman lain
export { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc };