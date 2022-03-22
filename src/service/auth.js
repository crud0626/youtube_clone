import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebaseApp from "./firebase";

export default class AuthService {
    constructor() {
        this.auth = getAuth();
        this.GoogleAuthProvider = new GoogleAuthProvider();
    }

    async login() {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
        // provider.setCustomParameters({"client_id": "39305247463-nk83t24f3f557m97tchvrkjab0kn3kf0.apps.googleusercontent.com"});
        const response = await signInWithPopup(this.auth, provider);

        const tokens = {
            "accessToken": response._tokenResponse.oauthAccessToken,
            "expires": Date.now() + (response._tokenResponse.oauthExpireIn * 1000),
            "refreshToken": response._tokenResponse.refreshToken
        };

        this.saveTokens(response.user.uid, tokens);
        
        return response;
    }

    saveTokens(uid, tokens) {
        localStorage.setItem(uid, JSON.stringify(tokens));
        // 좋아요 및 등등 accessToken이 필요한 작업을 위한 함수를 만들고
        // 해당 함수 내부에서는 expires를 체크 후 현재보다 시간이 남았다면 진행하고
        // 아니라면 refreshToken을 이용해 새로 Token을 받아온다.

        // refreshToken은 나중에 firebase의 realtime DB에 넣을 예정임.
    }

    getToken(uid) {
        const tokens = JSON.parse(localStorage.getItem(uid));
        // Date.now랑 비교 후 true면 return 아니라면 토큰 갱신하기.
        return tokens.accessToken;
    }

    getNewToken() {
        
    }

    logOut() {
        return signOut(this.auth);
    }

    checkUser() {
        return this.auth.currentUser;
    }
}