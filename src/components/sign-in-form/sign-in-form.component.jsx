import { useState } from "react";
import { signInAuthUserWithEmailAndPassword,
         createUserDocumentFromAuth,
         signInWithGooglePopup} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'


const defaultFormFields = {
    email: '',
    password: '',
}


function SingInForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
     


    const onChangeHandler = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user) // really necessary here? 
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            setFormFields(defaultFormFields);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email')
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email adress')
                    break;
                default:
                    console.log(error)
            }
        }
    }



    return ( 
        <div className="sign-in-container">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        
        <form onSubmit={handleSubmit} >
           
            <FormInput  
                label='Email'
                type="email" 
                value = {email} 
                name="email" 
                onChange={onChangeHandler} 
                required 
            />
            <FormInput  
                label='Password'
                type="password" 
                value = {password} 
                name="password"
                onChange={onChangeHandler} 
                required 
            />
            <div className='buttons-container'>
                <Button 
                    children='SIGN IN' 
                    type='submit'
                    onClick={handleSubmit}>
                </Button>
                <Button 
                    children='GOOGLE SIGN IN'
                    // typy="button"
                    buttonType='google' 
                    onClick={signInWithGoogle}>
                </Button>
            </div>

        </form>



        
    </div>
     );
}

export default SingInForm;