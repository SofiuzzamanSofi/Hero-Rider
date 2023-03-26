import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';

import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';





function Profile() {

    const { user } = useContext(AuthContext);



    // name destructure --
    const nameArray = user?.displayName?.split(" ");
    const lastName = nameArray.pop();
    const firstName = nameArray.join(" ")




    const { data: userFromDB } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user?email=${user?.email}`)
            return data.data.data;
        }
    })




    return (
        <div
            className={`grid gap-4 `}
        >
            {user?.uid &&
                <section className="p-6 bg-gray-800 text-gray-50">
                    <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
                    // onSubmit={formSubmitFunction}
                    >
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full">
                                <p className="font-medium">Personal Inormation</p>
                                <p className="">User Type: <span className='text-red-500 font-extrabold'>{userFromDB?.userType}</span></p>
                                {
                                    (userFromDB?.trxId && userFromDB?.userType !== "admin") &&
                                    <p className="">TrxId: <span className='text-xs'>{userFromDB?.trxId}</span></p>
                                }
                            </div>
                            <div className="col-span-full">
                                <div className='flex justify-center items-center flex-col gap-2'>
                                    <img src={user?.photoURL} alt="" className='rounded-full max-w-[180px] max-h-[120px]' />
                                    {
                                        !userFromDB?.payedStatus ?
                                            <>
                                                <p className='text-sm'>Pay First Pls</p>
                                                <Link to={`/payment?email=${userFromDB?.email}&vehiclesType=${userFromDB?.vehiclesType}`} className='text-red-500 btn btn-xs'>Pay</Link>
                                            </>
                                            :
                                            (userFromDB?.userType !== "admin") &&
                                            <>
                                                <p className='text-sm'>Payed Status</p>
                                                <button className='text-green-500 btn btn-xs'>Success</button>
                                            </>
                                    }
                                </div>

                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="firstName" className="text-sm">First name</label>
                                <input id="firstName" name="firstName" type="text" placeholder="First name" defaultValue={firstName} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="lastName" className="text-sm">Last name</label>
                                <input id="lastName" name="lastName" type="text" placeholder="Last name" defaultValue={lastName} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="email" className="text-sm">Email</label>
                                <input id="email" name="email" type="email" placeholder="Email" defaultValue={user?.email} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" disabled />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="age" className="text-sm">Age</label>
                                <input type="date" name="age" placeholder="age" defaultValue={userFromDB?.age} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="address" className="text-sm">Address</label>
                                <input id="address" name="address" type="text" placeholder="" defaultValue={userFromDB?.address} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="number" className="text-sm">Number</label>
                                <input id="number" name="number" type="number" placeholder="+8800---" defaultValue={userFromDB?.phoneNumber} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="state" className="text-sm">Area / State</label>
                                <input id="state" name="state" type="text" placeholder="" defaultValue={userFromDB?.state} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                            </div>

                            {
                                userFromDB?.userType === "rider" &&
                                <>
                                    <div className="col-span-full sm:col-span-2">
                                        <label htmlFor="license-number" className="text-sm">License Number</label>
                                        <input id="license-number" name="license-number" type="text" placeholder="" defaultValue={userFromDB?.licenseNumber} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                    </div>

                                </>
                            }
                        </div>


                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full">
                                <p className="font-medium">Vehicles Information</p>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="vehicles-type" className="text-sm">Vehicles Type</label>
                                <select className="select select-bordered w-full max-w-xs" name='vehicles-type'>
                                    <option value="Car" defaultValue={userFromDB?.vehiclesType === "Car"}>Car</option>
                                    <option value="Motorcycle" defaultValue={userFromDB?.vehiclesType === "Motorcycle"}>Motorcycle</option>
                                </select>
                            </div>

                            {
                                userFromDB?.userType === "rider" &&
                                <>
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="company-name" className="text-sm">Company Name</label>
                                        <input id="company-name" name="company-name" type="text" placeholder="name of company" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                                            defaultValue={userFromDB?.companyName}
                                        />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="model" className="text-sm">Model</label>
                                        <input id="model" name="model" type="text" placeholder="model" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                                            defaultValue={userFromDB?.model}
                                        />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="registration-number" className="text-sm">Registration Number</label>
                                        <input id="registration-number" name="registration-number" type="text" placeholder="registration-number" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                                            defaultValue={userFromDB?.registrationNumber}
                                        />
                                    </div>
                                </>
                            }






                            <div className="col-span-full">
                                <p className="font-medium">Important Documents</p>
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="nid" className="text-sm">NID</label>
                                <img src={userFromDB?.nid} alt="" className='' />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="nid" className="text-sm">{userFromDB?.drivingLicense && "Driving License"}</label>
                                <img src={userFromDB?.drivingLicense} alt="" className='' />
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="text-sm">Description</label>
                                <textarea id="description" name="description" placeholder="" defaultValue={userFromDB?.description} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required></textarea>
                            </div>
                            {
                                user?.uid ?
                                    ""
                                    :
                                    <>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="password" className="text-sm">Password</label>
                                            <input id="password" name="password" type="password" placeholder="password" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="confirm-password" className="text-sm">Confirm Password</label>
                                            <input id="confirm-password" name="confirm-password" type="password" placeholder="confirm-password" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                        </div>
                                    </>
                            }
                            {/* <div className="col-span-full">

                                <button type="submit" className="px-4 py-2 border rounded-md border-gray-100 btn" disabled={loadingButton}>
                                    {loadingButton ? "Loading..." : "Register"}
                                </button>

                            </div> */}
                        </div>

                    </form>
                </section>
            }
        </div>
    )
}


export default Profile