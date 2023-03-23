import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {

    const { loading, setLoading, user } = useContext(AuthContext);
    const [clickType, setClickType] = useState(false);
    const [loadignButton, setLoadingButton] = useState(false);
    const navigate = useNavigate();
    const clickTypeFunction = (path) => {
        setClickType(path)
    };
    // console.log("::::", clickType);


    const formSubmitFunction = e => {
        e.preventDefault();
        const form = e.target;
        // console.log("clg:", form?.firstName?.value);
        const name = form?.firstName?.value + " " + form?.lastName?.value;
        const email = form?.email?.value;
        const age = form?.age?.value;
        const address = form?.address?.value;
        const number = form?.number?.value;
        const state = form?.state?.value;
        const licenseNumber = form?.["license-number"]?.value;

        const drivingLicense = form?.["driving-license"]?.files[0];
        const nid = form?.nid?.files[0];
        const profilePhoto = form?.["profile-photo"]?.files[0];

        const vehiclesType = form?.["vehicles-type"]?.value;
        const companyName = form?.["company-name"]?.value;
        const model = form?.model?.value;
        const registrationNumber = form?.["registration-number"]?.value;
        const description = form?.description?.value;
        const password = form?.password?.value;
        const confirmPassword = form?.["confirm-password"]?.value;
        if (password !== confirmPassword) return alert("password don't match");


        // image upload on firebase --- 
        const storage = getStorage();
        const drivingLicenseRef = ref(storage, `hero-rider/${drivingLicense?.name}`);
        const nidRef = ref(storage, `hero-rider/${nid?.name}`);
        const profilePhotoRef = ref(storage, `hero-rider/${profilePhoto?.name}`);


        const fileUploadFunction = async (storageOfRef, file) => {
            return new Promise((resolve, reject) => {
                uploadBytes(storageOfRef, file)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then((url) => {
                                resolve(url);
                            })
                            .catch((error) => reject(error));
                    })
                    .catch((error) => reject(error));
            });
        }


        const uploadImageAll = async () => {
            setLoadingButton(true);
            const promises = [];
            if (profilePhotoRef) promises.push(fileUploadFunction(profilePhotoRef, profilePhoto));

            if (drivingLicenseRef) promises.push(fileUploadFunction(drivingLicenseRef, drivingLicense));
            if (nidRef) promises.push(fileUploadFunction(nidRef, nid));

            return await Promise.all(promises);

        }
        uploadImageAll()
            .then((allUrls) => {
                const userInfo = {
                    userType: clickType,
                    regTime: new Date(),
                    name,
                    email,
                    age,
                    address,
                    number,
                    state,
                    description,
                    password,

                    licenseNumber: licenseNumber || "",
                    companyName: companyName || "",
                    model: model || "",
                    registrationNumber: registrationNumber || "",
                    vehiclesType: vehiclesType || "",


                    profilePhoto: allUrls[0],

                    drivingLicense: allUrls[1] || "",
                    nid: allUrls[2] || "",


                }
                console.log("userInfo:", userInfo);
                axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, userInfo)
                    .then(res => {
                        if (res?.data?.success) {
                            console.log(res?.data);
                        }
                        setLoadingButton(false);
                        navigate("/profile")
                    }).catch(erro => console.log(erro))
            })
            .catch((error) => console.error(error));

    }


    return (
        <div className={`flex justify-center items-center ${clickType ? "" : "md:absolute top-0 right-0 left-0 bottom-0"} my-10 md:my-0`}>


            {/* path user type ---  */}
            <div
                className={`grid gap-4 ${clickType ? "translate-x-[-4000px]" : "translate-x-36"} duration-1000 transition-all`}
            >
                <button className="btn flex justify-between gap-2"
                    onClick={() => clickTypeFunction("rider")}
                >
                    <span>
                        Join as a rider
                    </span>
                    <span>
                        <BsFillArrowRightCircleFill />
                    </span>
                </button>

                <button className="btn flex justify-between gap-2"
                    onClick={() => clickTypeFunction("lerner")}
                >
                    <span>
                        Join as a Driving Lesson Learner
                    </span>
                    <span>
                        <BsFillArrowRightCircleFill />
                    </span>
                </button>
                <ul className="steps">
                    <li className="step step-primary">Emai</li>
                    <li className={`step ${clickType ? "step-primary" : ""}`}>From</li>
                    <li className="step">Finish</li>
                </ul>
            </div>

            {/* user from ---  */}
            <div
                className={`grid gap-4 ${clickType ? "translate-x-[-144px]" : "translate-x-[4000px]"} duration-1000 transition-all`}
            >


                {
                    clickType ?
                        <div className='border'>
                            <section className="p-6 bg-gray-800 text-gray-50">
                                <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
                                    onSubmit={formSubmitFunction}
                                >
                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                        <div className="col-span-full">
                                            <p className="font-medium">Personal Inormation</p>
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="firstName" className="text-sm">First name</label>
                                            <input id="firstName" name="firstName" type="text" placeholder="First name" defaultValue={user?.displayName} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="lastName" className="text-sm">Last name</label>
                                            <input id="lastName" name="lastName" type="text" placeholder="Last name" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="email" className="text-sm">Email</label>
                                            <input id="email" name="email" type="email" placeholder="Email" defaultValue={user?.email} className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" disabled />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="age" className="text-sm">Age</label>
                                            <input type="date" name="age" placeholder="age" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="address" className="text-sm">Address</label>
                                            <input id="address" name="address" type="text" placeholder="" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                        </div>
                                        <div className="col-span-full sm:col-span-2">
                                            <label htmlFor="number" className="text-sm">Number</label>
                                            <input id="number" name="number" type="number" placeholder="+8800---" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                        </div>
                                        <div className="col-span-full sm:col-span-2">
                                            <label htmlFor="state" className="text-sm">Area / State</label>
                                            <input id="state" name="state" type="text" placeholder="" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                        </div>
                                        {
                                            clickType === "rider" ?
                                                ""
                                                :
                                                ""
                                        }
                                        {
                                            clickType === "rider" ?
                                                <>
                                                    <div className="col-span-full sm:col-span-2">
                                                        <label htmlFor="license-number" className="text-sm">License Number</label>
                                                        <input id="license-number" name="license-number" type="text" placeholder="" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                                    </div>
                                                    <div className="col-span-full sm:col-span-2">
                                                        <label htmlFor="driving-license" className="text-sm">Driving License</label>
                                                        <input id="driving-license" name="driving-license" type="file" placeholder="" className="border-[1px] p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required accept="image/*" />
                                                    </div>
                                                </>
                                                :
                                                ""
                                        }

                                        <div className="col-span-full sm:col-span-2">
                                            <label htmlFor="nid" className="text-sm">NID</label>
                                            <input id="nid" name="nid" type="file" placeholder="" className="border-[1px] p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required accept="image/*" />
                                        </div>
                                        <div className="col-span-full sm:col-span-2">
                                            <label htmlFor="profile-photo" className="text-sm">Profile Photo</label>
                                            <input id="profile-photo" name="profile-photo" type="file" placeholder="" className="border-[1px] p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required accept="image/*" />
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                        <div className="col-span-full">
                                            <p className="font-medium">Vehicles Information</p>
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="vehicles-type" className="text-sm">Vehicles Type</label>
                                            <select className="select select-bordered w-full max-w-xs" name='vehicles-type'>
                                                <option value="Car">Car</option>
                                                <option value="Motorcycle">Motorcycle</option>
                                            </select>
                                        </div>
                                        {
                                            clickType === "rider" ?
                                                <>
                                                    <div className="col-span-full sm:col-span-3">
                                                        <label htmlFor="company-name" className="text-sm">Company Name</label>
                                                        <input id="company-name" name="company-name" type="text" placeholder="name of company" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                                    </div>
                                                    <div className="col-span-full sm:col-span-3">
                                                        <label htmlFor="model" className="text-sm">Model</label>
                                                        <input id="model" name="model" type="text" placeholder="model" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                                    </div>
                                                    <div className="col-span-full sm:col-span-3">
                                                        <label htmlFor="registration-number" className="text-sm">Registration Number</label>
                                                        <input id="registration-number" name="registration-number" type="text" placeholder="registration-number" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required />
                                                    </div>
                                                </>
                                                :
                                                ""
                                        }
                                        <div className="col-span-full">
                                            <label htmlFor="description" className="text-sm">Description</label>
                                            <textarea id="description" name="description" placeholder="" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" required></textarea>
                                        </div>
                                        <div className="col-span-full">
                                            <p className="font-medium">Password Information</p>
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
                                        <div className="col-span-full">

                                            <button type="submit" className="px-4 py-2 border rounded-md border-gray-100 btn" disabled={loadignButton}>
                                                {loadignButton ? "Loading..." : "Register"}
                                            </button>

                                        </div>
                                    </div>

                                </form>
                            </section>
                        </div>
                        :
                        <div>

                        </div>

                }

                <ul className="steps">
                    <li className="step step-primary cursor-pointer"
                        onClick={() => clickTypeFunction(false)}
                    >Emai</li>
                    <li className={`step ${clickType ? "step-primary" : ""}`}>From</li>
                    <li className="step">Finish</li>
                </ul>
            </div>

        </div>
    )
}
export default Register
