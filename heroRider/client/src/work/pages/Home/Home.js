import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function Home() {

    const { user } = useContext(AuthContext);

    const location = useLocation();
    const params = new URLSearchParams(location?.search);
    const payment_intent = params.get("payment_intent");


    useEffect(() => {
        if (payment_intent && user?.uid) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/payment?email=${user?.email}`, { payment_intent })
                .then(data => {
                    if (data.data.success) {
                        toast.success(`Payment Success and TrxId: ${payment_intent} store on Database .`)
                        window.location.replace("/profile")
                    }
                })
        }
    }, [payment_intent, user])




    return (
        <div>
            <Header />
            <div className='middle-div relative'>
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    )
}

export default Home