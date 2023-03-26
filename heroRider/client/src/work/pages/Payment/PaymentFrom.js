import React, { useContext, useEffect, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import "./Payment.module.css"
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";




export default function CheckoutForm() {


    const stripe = useStripe();
    const elements = useElements();

    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const paymentElementOptions = {
        layout: "tabs"
    }





    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            toast.error("No stripe and No elements")
            return;
        }

        setIsLoading(true);



        const payElement = elements.getElement(PaymentElement)
        if (payElement === null) {
            toast.error("PayElement is Null")
            return setIsLoading(true);
        }

        // const { error } = await stripe.confirmPayment({
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        });
        console.log("this is line 83");
        console.log(error); // add this line to see the value of error
        if (error) {
            toast.error("Error from stripe confirmPayments")
        } else toast.success("success")
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };





    return (
        <form id="payment-form" onSubmit={handleSubmit} className="min-w-[500px] max-w-[500px]">
            <LinkAuthenticationElement
                id="link-authentication-element"
            />
            <PaymentElement id="payment-element" options={paymentElementOptions}
                className="mb-6"
            />
            <button disabled={isLoading || !stripe || !elements} id="submit"
                className="buttonSubmit hover:brightness-125 bg-[#5469d4] text-[#ffffff] rounded-[4px] border-0 px-4 py-3 font-semibold cursor-pointer block w-full transition-all duration-200 ease "
            >
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message"
                className="text-[#697386] text-xs p-3 text-center leading-5"
            >
                {message}
            </div>}
        </form>
    );
}