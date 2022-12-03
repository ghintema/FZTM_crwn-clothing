import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// 2 things are necessary here:
// 1.) the context itself, wich carrys the DataTransfer
// 2.) a provider-component to spread the context and make it accessible all over the app


// UserContext is the actual object we want to access and change inside the components.
export const UserContext = createContext({
    // default value here
    currentUser: null,
    setCurrentUser: () => null
});


// this is the wrapper-component to spread the value among its children
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // signOutUser();

    useEffect(() => { 

        // calling this effect once establishes a listener on auth-state-changes and invokes the callback on any change
        // this way you can centralize 'setCurrentUser(user)' to one single place and it is invoked automatically on every user-change.
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user)
            if (user) { // only createUserDocument if it has not turned to null (wich it does in case of sign-out)
                createUserDocumentFromAuth(user) 
            }
            setCurrentUser(user);
        });

        return unsubscribe // clean-up (stopping the listener) after unmount to prevent memory-leak
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}