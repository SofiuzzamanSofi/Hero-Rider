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


    console.log("userFromDB:", userFromDB);
    // console.log(userFromDB?.userType);
    useEffect(() => {
        if (userFromDB?.userType !== "admin") {
            return navigate("/profile")
        }
    }, [userFromDB, navigate]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
            .then(data => {
                setAllUsers(data.data?.data.reverse())
            })
    }, []);

    console.log("allUsers:", allUsers?.length);

    return (
        <div>
            <div>
                <p className='text-center font-semibold text-2xl'>Dashboard</p>
                <p>Wellcome: {userFromDB?.displayName}</p>
                <p>Email: {userFromDB?.email}</p>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
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
                                        <span>{i}</span>
                                    </th>
                                    <td>
                                        {u?.displayName}
                                    </td>
                                    <td>
                                        {u?.email}
                                    </td>
                                    <td>
                                        {u?.userType}
                                    </td>
                                    <td>
                                        Action
                                    </td>

                                </tr>)
                            }




                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard