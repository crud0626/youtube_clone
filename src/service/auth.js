import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebaseApp from "./firebase";

export default class AuthService {
    constructor() {
        this.auth = getAuth();
        this.provider = new GoogleAuthProvider();
    }

    async login() {
        this.provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

        try {
            const userData = await signInWithPopup(this.auth, this.provider)
            .then(({_tokenResponse, user}) => {
                const tokens = {
                    "accessToken": _tokenResponse.oauthAccessToken,
                    "expires": Date.now() + (_tokenResponse.oauthExpireIn * 1000),
                };
    
                window.localStorage.setItem(user.uid, JSON.stringify(tokens));
    
                const data = {
                    "uid" : user.uid,
                    "name": user.displayName,
                    "url" : user.photoURL
                };
    
                return data;
            });

            return userData;
        } catch (error) {
            switch (error.code) {
                case "auth/popup-closed-by-user":
                    alert("로그인 중 팝업이 닫혔습니다. 다시 시도해 주세요");
                    throw error;
                case "auth/popup-blocked":
                    alert("팝업이 차단되었습니다. 해제 후 다시 시도해 주세요.");
                    throw error;
                default:
                    alert(`다음과 같은 이유로 로그인이 실패하였습니다. ${error.code}`);
                    throw error;
            }
        }
    }

    async logOut() {
        try {
            return await signOut(this.auth).then(() => true);
        } catch (error) {
            alert(`다음과 같은 이유로 로그아웃에 실패하였습니다. ${error.code}`);
            throw error;
        }
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