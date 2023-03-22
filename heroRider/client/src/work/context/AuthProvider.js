import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.init';



const AuthContext = createContext();
const auth = getAuth(app)



const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(user);

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    };
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const loginSocial = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, runningUser => {
            setUser(runningUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, []);

    const noImageFoundUrl = "https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png";
    const authInfo = { createNewUser, login, user, setUser, loading, setLoading, logOut, updateUser, loginSocial, noImageFoundUrl };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext };