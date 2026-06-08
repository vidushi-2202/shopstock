import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDr0rwzMxIyGecjnhieZX5ShNhOveYZ7fY",
  authDomain: "shopstock-caf2a.firebaseapp.com",
  projectId: "shopstock-caf2a",
  storageBucket: "shopstock-caf2a.firebasestorage.app",
  messagingSenderId: "1000378161693",
  appId: "1:1000378161693:web:d621ba5de9648c01d6c4f4"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)