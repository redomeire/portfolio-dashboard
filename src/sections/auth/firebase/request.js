import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const registerUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}

const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res.user.accessToken);
            localStorage.setItem("Authorization", res.user?.accessToken);
            setInterval(() => {
                window.location.reload();
            }, 1000)
        })
        .catch(err => {
            console.log(err);
        })
}

const signOutUser = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem("Authorization");
            console.log("successful logout");
            window.location.reload();
        })
        .catch((error) => {
            console.log("error ", error);
        });
}

export { registerUser, loginUser, signOutUser };