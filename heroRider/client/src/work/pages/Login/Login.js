import { GoogleAuthProvider } from 'firebase/auth'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useHistory } from "react-router";
import axios from 'axios';

import { AuthContext } from '../../context/AuthProvider';

function Login() {

    // // googleProvider ---
    const googleProvider = new GoogleAuthProvider();
    const { loginSocial, login, forgetPassword, setLoading, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    // const history = useHistory()


    const loginIdPw = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form?.email?.value;
        const password = form?.password?.value;
        // console.log("clg:", email, password);
        login(email, password)
            .then(result => {
                navigate("/profile")
                console.log("result");
                // navigate(from, { replace: true });
            })
            .catch(error => {
                forgetPassword(email)
                    .then(() => {
                        console.log("setpassword then");
                    })
                    .catch(err => {
                        console.log("setpassword catch");

                    })
                // setUser({ email, })
                // setLoading(false);
                // navigate("/register")
                // console.log(error)
            });
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
                // console.log("googlelogin:", result?.user);
                checkIfUserOnDborNot(result?.user?.email)
                // navigate("/register")
            }).catch(err => {
                console.log("error from google provider catch section:", err);
            })
    };

    const checkIfUserOnDborNot = eml => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/user?email=${eml}`)
            .then(res => {
                if (res?.data?.success) {
                    navigate("/profile");
                } else {
                    navigate("/register");
                }
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
                            <input id="submit" name="submit" type="submit" value="Login or SignUp" className="btn p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
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