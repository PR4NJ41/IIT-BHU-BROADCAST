import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAZT8e-bD_ATxbA3i_bwI_m75r2IpNyJqI",
	authDomain: "iit-bhu-broadcast.firebaseapp.com",
	projectId: "iit-bhu-broadcast",
	storageBucket: "iit-bhu-broadcast.appspot.com",
	messagingSenderId: "196556252587",
	appId: "1:196556252587:web:a1c0dff491a15880e29eee",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider,db};
