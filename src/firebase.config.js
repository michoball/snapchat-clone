import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbwW4d-Uo3psbfJOiAc8ek8xJZo1mGQQM",
  authDomain: "snapchat-clone-sonny-ab26a.firebaseapp.com",
  projectId: "snapchat-clone-sonny-ab26a",
  storageBucket: "snapchat-clone-sonny-ab26a.appspot.com",
  messagingSenderId: "123995045384",
  appId: "1:123995045384:web:82d121926b8cbf34db1bbd",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
