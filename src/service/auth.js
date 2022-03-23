import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebaseApp from "./firebase";

export default class AuthService {
    constructor() {
        this.auth = getAuth();
        this.provider = new GoogleAuthProvider();
    }

    async login() {
        this.provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

        const response = await signInWithPopup(this.auth, this.provider);
        const tokens = {
            "accessToken": response._tokenResponse.oauthAccessToken,
            "expires": Date.now() + (response._tokenResponse.oauthExpireIn * 1000),
        };
        
        this.saveTokens(response.user.uid, tokens);
        return response;
    }

    saveTokens(uid, tokens) {
        localStorage.setItem(uid, JSON.stringify(tokens));
    }

    getToken(uid) {
        const tokens = JSON.parse(localStorage.getItem(uid));
        return tokens.accessToken;
    }

    logOut() {
        return signOut(this.auth);
    }

    checkUser() {
        return this.auth.currentUser;
    }
}