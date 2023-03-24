import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.init';
import axios from 'axios';
import { toast } from 'react-hot-toast';



export const AuthContext = createContext();
const auth = getAuth(app)



export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [userFromDB, setUserFromDB] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("user AuthProvider:", user);
    console.log("userFromDB AuthProvider:", userFromDB);

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
        // setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const forgetPassword = (email) => {
        // setLoading(true);
        return sendPasswordResetEmail(auth, email);
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



    // check user on database or not ---
    useEffect(() => {
        const checkIfUserOnDBorNot = () => {
            if (!user?.email && !user?.uid) {
                return;
            }
            else {
                axios.post(`${process.env.REACT_APP_SERVER_URL}/user?email=${user?.email}`)
                    .then(res => {
                        if (res?.data?.success) {
                            setUserFromDB(res?.data?.data)
                            // toast.success(`Successfully login ${res?.data?.displayName}.`)

                        } else {
                            // navigate("/register");
                        }
                        console.log("under useeffet auth user chek:");
                        console.log("axios,:", res?.data);
                    });
            }
        };
        return () => checkIfUserOnDBorNot();
    }, [user?.uid])



    const noImageFoundUrl = "https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png";
    const authInfo = { createNewUser, login, user, setUser, loading, setLoading, forgetPassword, logOut, updateUser, loginSocial, noImageFoundUrl, userFromDB };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};
