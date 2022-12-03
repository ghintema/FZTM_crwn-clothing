import { useState } from "react";
import { createAuthUserWithEmailAndPassword,
         createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


function SingUpForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    
    const onChangeHandler = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        if (password != confirmPassword) {
            alert('Passwords do not match!')
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            // setCurrentUser(user); //this is done centralized in user.context via changeListener on the auth.
            setFormFields(defaultFormFields);
            
        } catch(error) {
            if(error.code ==='auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            }
            console.log('user creation encountered an error', error)
        }
            
    
    }

    return ( 
        <div className="sign-up-container">
            <h2>Don't have an accout?</h2>
            <span>Sign up with your email and password</span>
            
            <form onSubmit={onSubmitHandler} >
                
                <FormInput  
                    label='Display Name'
                    type='text'
                    value={displayName}
                    name="displayName" 
                    onChange={onChangeHandler} 
                    required 
                />
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
                <FormInput  
                    label='Password'
                    type="password" 
                    value = {confirmPassword} 
                    name="confirmPassword"
                    onChange={onChangeHandler} 
                    required 
                />
                <Button 
                    type="submit"
                    buttonType=''>Sign Up 
                </Button>
                
            </form>
        </div>
     );
}

export default SingUpForm;