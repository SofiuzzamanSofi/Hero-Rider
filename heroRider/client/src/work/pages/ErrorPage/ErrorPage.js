import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {

    const error = useRouteError();
    // console.log(error);


    return (
        <section className="min-h-screen flex items-center  sm:p-16 dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-4 text-center sm:max-w-md gap-0">
                <p className='text-5xl font-bold'>{error?.status}</p>
                <p className="text-5xl font-bold ">{error?.statusText}</p>
                <p className="text-sm">Looks like our services are currently offline</p>
                <Link to="/" rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</Link>
            </div>
        </section>
    );
};

export default ErrorPage;