import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
// doc retrieves the document as a whole
// getDoc/setDoc is to access specific data inside an document


// This data can be seen on:
// https://console.firebase.google.com/project/crwn-clothing-d4a53/settings/general/web:ZGJhNDAwY2QtNzQ1Ny00M2Q1LWJjNmQtOTVhMGQ0ZTJiNDhh
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apikey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// class instance of GoogleAuthProvider
const providerGoogle = new GoogleAuthProvider();
providerGoogle.setCustomParameters({
    prompt: 'select_account'
});


const providerGithub = new GithubAuthProvider();
providerGithub.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, providerGoogle)
export const signInWithGithubPopup = () => signInWithPopup(auth, providerGithub)


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    
    const userDocRef = doc(db, 'user', userAuth.uid); // this creates a reference-object to a specific document inside the 'user' collection.
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef); // using the reference to get all data of that document
    // console.log(userSnapshot)
    // console.log(userSnapshot.exists()) // this checks for the existence of userDocRef INSIDE of the firestore db.

    if(!userSnapshot.exists()) { // if userDocRef does not yet exist in the database, than create it.
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            }) 
            console.log('test')
        } catch(error) {
                console.log('error creating the user', error);
        }
    
    }

    return userDocRef;
}