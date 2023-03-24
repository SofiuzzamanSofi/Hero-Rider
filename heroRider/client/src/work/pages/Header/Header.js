import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import hIcon from "../../assets/hIcon.png"
import { AuthContext } from '../../context/AuthProvider';
import { FaTimes } from "react-icons/fa";






function Header() {


    const { user, createNewUser, updateUser, logOut, setUser, noImageFoundUrl } = useContext(AuthContext);
    const [miniProfile, setMiniProfile] = useState(false);
    const navigate = useNavigate();
    console.log(miniProfile);



    const logOutFunction = () => {
        logOut()
            .then(() => {
                setMiniProfile(false)
                toast.success('Log Out Successful.')
                setUser(null);
                navigate("/login")
            }).catch(() => {
                // An error happened.
                toast.error('Log Out UnSuccess, Something Happened Unnecessary.')
            });
    };



    // mini screen and log out button ---
    const miniPicAnimationCssClass = `bg-slate-300 dark:bg-slate-900 text-black dark:text-white absolute top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center flex-col gap-5 fixed duration-300 transition-all ${!miniProfile ? "translate-x-0" : "translate-x-full"}`
    const miniProfileHTML = <>
        <div
            className={miniPicAnimationCssClass}
        >
            <div>
                <button
                    className='absolute top-10 left-10'
                >
                    <FaTimes className='w-8 h-8'
                        onClick={() => setMiniProfile(prv => !prv)}
                    />
                </button>
            </div>
            <div>
                <Link to="/profile">Dashboard</Link>
            </div>
            <div>
                <Link to="/profile">Profile</Link>
            </div>
            <div>
                <Link to="/" className="text-red-600 hover:border border-red-600 px-10 py-3 rounded-md"
                    onClick={logOutFunction}
                >
                    Log Out
                </Link>
            </div>
        </div>
    </>






    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li tabIndex={0}>
                            <a className="justify-between">
                                Parent
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                            </a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl flex justify-center items-center gap-1">
                    <img className='max-w-[40px] bg-white rounded-l-sm' src={hIcon} alt="" />
                    Hero Rider
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li tabIndex={0}>
                        <a>
                            Parent
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">



                {/* login log out and pro pic simple show ---  */}
                {
                    !user?.uid ?

                        <Link to="login" className="btn"> Log In</Link>
                        :
                        <img
                            className='rounded-full w-12 h-12 cursor-pointer'
                            src={user?.photoURL || noImageFoundUrl} alt="" title='click to details'
                            onClick={() => setMiniProfile(prv => !prv)}
                        />
                }
                {
                    !user?.uid ?
                        ""
                        :
                        miniProfile ?
                            ""
                            :
                            miniProfileHTML
                }





            </div>
        </div>
    )
};

export default Header;