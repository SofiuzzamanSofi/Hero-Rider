import { GoogleAuthProvider } from 'firebase/auth'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';






function Login() {

    // // googleProvider initialized---
    const googleProvider = new GoogleAuthProvider();

    const { loginSocial, login, forgetPassword, setLoading, setUser } = useContext(AuthContext);
    const navigate = useNavigate();




    // check user on database or not ---
    const checkIfUserOnDBorNot = eml => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/user?email=${eml}`)
            .then(res => {
                if (res?.data?.success) {
                    toast.success(`Successfully login ${res?.data?.data?.displayName}.`)
                    navigate("/profile")
                } else {
                    navigate("/register");
                }
            })
    }



    // email & password input from submit function ---
    const loginIdPw = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form?.email?.value;
        const password = form?.password?.value;


        // email & password input function ---
        login(email, password)
            .then(result => {
                checkIfUserOnDBorNot(result?.user?.email)
            })
            .catch(() => {
                // forget password function ---
                forgetPassword(email)
                    .then(() => {
                        toast.error(` 
                        Oh you forget your password egain \n\n
                        Don't Worry. \n\n
                        Forget Password request send to: ${email}. \n\n
                        Check your Email Pls.
                        `)
                    })
                    .catch(() => {
                        toast(`Welcome ${email} Pls Fill Up All Steps.`);
                        setUser({ email, })
                        navigate("/register")
                    })
                setLoading(false);
            });
    }




    // google login button---
    const loginWithSocialButton = () => {
        loginSocial(googleProvider)
            .then(result => {
                checkIfUserOnDBorNot(result?.user?.email)
            }).catch(() => {
            })
    };






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