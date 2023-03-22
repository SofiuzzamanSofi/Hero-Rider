import { GoogleAuthProvider } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';

function Login() {

    // // googleProvider ---
    const googleProvider = new GoogleAuthProvider();
    const { loginSocial } = useContext(AuthContext);
    const loginWithSocialButton = () => {
        loginSocial(googleProvider)
            .then(result => {
                console.log("googlelogin:", result?.user);
            }).catch(err => {
                console.log("error from google provider catch section:", err);
            })
    }

    return (
        <div className='flex justify-center items-center md:absolute top-0 right-0 left-0 bottom-0 my-10 md:my-0'>
            <button className="btn"
                onClick={loginWithSocialButton}
            >Sign in With Google</button>
        </div>
    )
}

export default Login