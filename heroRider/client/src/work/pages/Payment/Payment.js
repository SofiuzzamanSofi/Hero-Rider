import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import CheckoutForm from './PaymentFrom';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';


const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);





function Payment() {

    const [clientSecret, setClientSecret] = useState(null)
    const location = useLocation();
    const params = new URLSearchParams(location?.search)
    const email = params.get("email");
    const vehiclesType = params.get("vehiclesType");





    // get paymentIntent.client_secret from database --
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, { items: vehiclesType })
            return data.data.data;
        }
    });

    useEffect(() => {
        if (typeof (data) !== 'object') {
            setClientSecret(data)
        }
    }, [data])



    if (!clientSecret) {

    } else {
        const appearance = {
            theme: 'stripe',
        };
        const options = {
            clientSecret,
            appearance,
        };
        return <Elements options={options} stripe={stripePromise}>
            <div className="mx-auto flex justify-center items-center">
                <div className=''>
                    <div>
                        <p>Payment Info:</p>
                        <p>Email: {email}</p>
                        <p>VehiclesType: {vehiclesType}</p>
                        <p>Pay Amount: {vehiclesType === "Car" ? 200 : 100}</p>
                    </div>
                    <CheckoutForm clientSecret={clientSecret} />
                </div>
            </div>
        </Elements>
    }
}
export default Payment