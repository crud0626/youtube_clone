import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebaseApp from "./firebase";

export default class AuthService {
    constructor() {
        this.auth = getAuth();
        this.provider = new GoogleAuthProvider();
    }

    async login() {
        this.provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

        return await signInWithPopup(this.auth, this.provider)
        .then(response => {
            const tokens = {
                "accessToken": response._tokenResponse.oauthAccessToken,
                "expires": Date.now() + (response._tokenResponse.oauthExpireIn * 1000),
            };

            window.localStorage.setItem(response.user.uid, JSON.stringify(tokens));

            const data = {
                "uid" : response.user.uid,
                "name": response.user.displayName,
                "url" : response.user.photoURL
            };

            return data;
        })
        .catch(err => {
            if (err.code === "auth/popup-closed-by-user") {
                alert("로그인 중 팝업이 닫혔습니다. 다시 시도해 주세요");
            } else {
                console.log(`다음과 같은 이유로 로그인이 실패하였습니다. ${err.code}`);
            }
        });
    }

    async logOut() {
        return await signOut(this.auth)
        .then(() => true)
        .catch(err => {
            alert(`다음과 같은 이유로 로그아웃에 실패하였습니다. ${err.code}`);
        })
    }

    checkUser() {
        const data = this.auth.currentUser;
        if (data) {
            const result = {
                "uid" : data.uid,
                "name": data.displayName,
                "url" : data.photoURL
            };
            return result;
        }
        return data;
    }
}