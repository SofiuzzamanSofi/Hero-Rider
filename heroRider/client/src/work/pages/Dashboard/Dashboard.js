import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { BiXCircle } from 'react-icons/bi';





function Dashboard() {



    const { user } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();


    // click checkbox --- 
    const [checkSelect, setCheckSelect] = useState([]);
    const checkBoxFunction = (_id) => {
        console.log("_id:", _id);
        const find = checkSelect?.includes(_id);
        if (find) {
            const index = checkSelect.indexOf(_id);
            const newCheckSelect = [...checkSelect];
            newCheckSelect.splice(index, 1);
            setCheckSelect(newCheckSelect);
        } else {
            const newCheckSelect = [...checkSelect, _id];
            setCheckSelect(newCheckSelect);
        }
    };

    const deleteAllButtonFn = () => {
        setModalOpen(true)
        // console.log(userFromDB?.userType);
        console.log("checkSelect", checkSelect?.length);
    };
    const deleteYesButtonFn = () => {

    }
    window.addEventListener("scroll", () => {
        deleteNoClosedButtonFn()
    })
    const deleteNoClosedButtonFn = () => {
        setModalOpen(false)
    }






    // pagination --- 
    const [pageCount, setPageCount] = useState(0)
    const [pageNo, setPageNo] = useState(0);
    let perPageCountSize = 10;
    const pages = Math.ceil(pageCount / perPageCountSize)

    const { data: userFromDB } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user?email=${user?.email}`)
            if (data.data?.data?.userType !== "admin") {
                toast("your are not a admin. \n\n This is page is only for admin.")
            }
            return data.data?.data;
        }
    });




    useEffect(() => {
        if (userFromDB?.userType !== "admin") {
            return navigate("/profile")
        }
    }, [userFromDB, navigate]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/users?pageNo=${pageNo}&perPageCountSize=${perPageCountSize}`)
            .then(data => {
                setAllUsers(data.data?.data.reverse())
                setPageCount(data.data?.count)
            })
    }, [pageNo, pageCount, perPageCountSize]);

    // console.log("allUsers:", allUsers?.length);

    return (
        <div>
            <div

            >
                <div>
                    <p className='text-center font-semibold text-2xl'>Dashboard</p>
                    <p>Welcome: {userFromDB?.displayName}</p>
                    <p>Email: {userFromDB?.email}</p>
                </div>
                <div className="overflow-x-auto">
                    <div className='py-5 grid gap-2 grid-cols-2 md:grid-cols-6 lg:grid-cols-8'>
                        <input type="text" placeholder='Email' className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                        <input type="text" placeholder='+0081---' className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                        <input type="text" placeholder='Full Name' className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                        <input type="date" name="age" placeholder="age" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                        <span className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white flex justify-center cursor-default">To</span>

                        <input type="date" name="age" placeholder="age" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white" />
                        <button className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white border cursor-not-allowed"
                            disabled
                        >
                            Search</button>
                        <button
                            className={`p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white border ${!checkSelect.length > 0 ? "cursor-not-allowed" : ""}`}
                            disabled={!checkSelect.length > 0}
                            onClick={deleteAllButtonFn}
                        >
                            Delete All Checked
                        </button>
                    </div>
                    <div
                    // onClick={deleteNoClosedButtonFn}
                    >
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Age</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    allUsers?.length &&
                                    allUsers?.map((u, i) => <tr key={i} className="hover">
                                        <th
                                            className='flex gap-2'
                                        >
                                            <input type="checkbox" name="" id=""
                                                onClick={() => checkBoxFunction(u._id)}
                                            />
                                            <span>{(pageNo * perPageCountSize) + i + 1}</span>
                                        </th>
                                        <td>
                                            {u?.displayName}
                                        </td>
                                        <td>
                                            {u?.email}
                                        </td>
                                        <td>
                                            {u?.phoneNumber}
                                        </td>
                                        <td>
                                            {u?.age}
                                        </td>
                                        <td>
                                            {u?.userType}
                                            {/* {(u?.userType === "lerner") && (u?.payedStatus) ? "Paid" : "Unpaid"} */}
                                        </td>
                                        <td>
                                            <button className='btn btn-xs' disabled>Action</button>
                                        </td>

                                    </tr>)
                                }




                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-center items-center py-4 mt-4 border-y-[1px]'>
                    <div>
                        <p className='text-center'>Currently Selected Page: {pageNo + 1}</p>
                        {
                            [...Array(pages).keys()].map((num, i) => <button
                                disabled={num === pageNo}
                                key={i}
                                className={`border m-1 px-1 ${num === pageNo ? "bg-sky-500 text-white" : "bg-slate-700 text-white"}`}
                                onClick={() => setPageNo(num)}
                            >
                                {num + 1}
                            </button>)
                        }
                    </div>
                </div>
            </div>

            {
                modalOpen &&
                <div className='fixed top-0 bottom-0 left-0 right-0 min-h-screen flex justify-center items-center'
                    onBlur={deleteNoClosedButtonFn}
                >
                    <div className='border bg-slate-600 min-h-[220px] min-w-[320px] p-4 rounded-md relative'

                    >
                        <button className='absolute top-4 right-4'                                >
                            <BiXCircle className='w-8 h-8 bg-slate-900 rounded-full text-white'
                                onClick={deleteNoClosedButtonFn}
                            />
                        </button>
                        <div className='absolute bottom-2 left-0 right-0'>
                            <div className='flex justify-between px-4'>
                                <button className='btn bg-slate-900 text-white'
                                // onClick={}
                                > Yes</button>
                                <button className='btn bg-slate-900 text-white'
                                    onClick={deleteNoClosedButtonFn}
                                > No</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard

