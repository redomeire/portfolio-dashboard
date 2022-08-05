import { getAuth, createUserWithEmailAndPassword, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailAndPassword, signOut, signInWithEmailLink } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:3000/register',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };

  const signInWithoutPassword = (email) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
        localStorage.setItem('emailForSignIn', email);
        // window.location.href = 'http://localhost:3000/email-verification';
    })
    .catch((error) => {
        const errorCode = error?.code;
        const errorMessage = error?.message;

        console.log('code : ', errorCode);
        console.error('error : ', errorMessage);
    })

    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem('emailForSignIn');
        if(!email) {
            email = prompt('Please Provide your email for confirmation');
        }

        signInWithEmailLink(auth, email, window.location.href)
        .then(res => {
            window.localStorage.removeItem('emailForSignIn');
            console.log(res);
        })
        .catch(err => {
            console.log('some error occured')
            console.err(err);
        })
    }
  }

const registerUser = (email, password) => {
    if((email && password) !== null) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
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

export { registerUser, signInWithoutPassword, loginUser, signOutUser };