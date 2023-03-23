import { GoogleAuthProvider } from 'firebase/auth'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useHistory } from "react-router";

import { AuthContext } from '../../context/AuthProvider';

function Login() {

    // // googleProvider ---
    const googleProvider = new GoogleAuthProvider();
    const { loginSocial } = useContext(AuthContext);
    const navigate = useNavigate();
    // const history = useHistory()


    const loginIdPw = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form?.email?.value;
        const password = form?.password?.value;
        console.log("clg:", email, password);
    }


    const loginWithSocialButton = () => {
        loginSocial(googleProvider)
            .then(result => {
                // history?.push({
                //     pathname: "/register",
                //     state: {
                //         user: result?.user,
                //     }
                // })
                console.log("googlelogin:", result?.user);
                navigate("/register")
            }).catch(err => {
                console.log("error from google provider catch section:", err);
            })
    }

    return (
        <div className='flex justify-center items-center md:absolute top-0 right-0 left-0 bottom-0 my-10 md:my-0'>

            <div className='border rounded-sm'>
                <div>
                    <form
                        className="grid gap-2 p-4"
                        onSubmit={loginIdPw}
                    >
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <input id="email" name="email" type="email" placeholder="Email" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input id="password" name="password" type="password" placeholder="password" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input id="submit" name="submit" type="submit" value="Submit" className="btn p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                        </div>
                        <div className="col-span-full sm:col-span-3 pt-4"
                            onClick={loginWithSocialButton}
                        >

                            <input id="submit" name="submit" type="submit" value="Sign in With Google" className="btn p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login