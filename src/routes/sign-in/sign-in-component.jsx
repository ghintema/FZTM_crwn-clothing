import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
// import { signInWithGithubPopup } from '../../utils/firebase/firebase.utils'


function SignIn () {


    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    // const logGithubUser = async () => {
    //     const response = await signInWithGithubPopup();
    //     console.log(response)
    // }

    return ( 
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
     );
}

export default SignIn ;