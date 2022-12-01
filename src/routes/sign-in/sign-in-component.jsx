import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth,
         signInWithGooglePopup, 
        //  signInWithGoogleRedirect, 
         createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import SingUpForm from '../../components/sign-up-form/sign-up-form.component';


function SignIn () {

    // useEffect(() => { // this useEffect is for the case of a redirect after signInWithGoogleRedirect.
    //     const getRedirectResults = async () => {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user)
    //         }
    //     };
    //     getRedirectResults();
    // }, [])

    const logGoogleUser = async () => {
        // console.log(auth)
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
        console.log(auth)
    }

    return ( 
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SingUpForm />
        </div>
     );
}

export default SignIn ;