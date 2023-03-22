import { GoogleAuthProvider } from 'firebase/auth'
import React from 'react'

function Login() {

    const googleProvider = new GoogleAuthProvider();
    const loginWithSocialButton = () => {

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