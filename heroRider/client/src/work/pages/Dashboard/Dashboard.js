import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

function Dashboard() {



    const { user } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState(null);
    const navigate = useNavigate();
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


    // console.log("userFromDB:", userFromDB);
    // console.log(userFromDB?.userType);
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
            <div>
                <p className='text-center font-semibold text-2xl'>Dashboard</p>
                <p>Welcome: {userFromDB?.displayName}</p>
                <p>Email: {userFromDB?.email}</p>
            </div>
            <div className="overflow-x-auto">
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
                                    <input type="checkbox" name="" id="" />
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
                                    Action
                                </td>

                            </tr>)
                        }




                    </tbody>
                </table>
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
    )
}

export default Dashboard