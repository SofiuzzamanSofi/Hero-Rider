import React, { useContext, useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import CheckoutForm from './PaymentFrom';


const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function Payment() {

    const { userFromDB } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState(null)



    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    // useEffect(() => {
    //     axios.post(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, { items: userFromDB?.vehiclesType })
    //         .then(res => {
    //             if (res.data?.success) {
    //                 setClientSecret(res.data.clientSecret)
    //             }
    //         })
    // }, [userFromDB?.vehiclesType])






    return clientSecret &&
        <Elements options={options} stripe={stripePromise}>
            <div>
                <div>Payment</div>
                <CheckoutForm />
            </div>
        </Elements>


}

export default Payment