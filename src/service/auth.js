import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseApp from "./firebase";

export default class AuthService {
    constructor() {
        this.auth = getAuth();
        this.GoogleAuthProvider = new GoogleAuthProvider();
    }

    login() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, provider);
    }
}