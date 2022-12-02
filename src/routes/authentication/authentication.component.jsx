

import SingUpForm from '../../components/sign-up-form/sign-up-form.component';
import SingInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'



const defaultFormFields = {
    email: '',
    password: '',
}


function Authentication () {
    
    // useEffect(() => { // this useEffect is for the case of a redirect after signInWithGoogleRedirect.
    //     const getRedirectResults = async () => {
        //         const response = await getRedirectResult(auth);
        //         if (response) {
            //             const userDocRef = await createUserDocumentFromAuth(response.user)
            //         }
            //     };
            //     getRedirectResults();
            // }, [])




    return ( 
        <div className="authentication-container">
            <SingInForm />
            <SingUpForm />
        </div>
     );
}

export default Authentication ;