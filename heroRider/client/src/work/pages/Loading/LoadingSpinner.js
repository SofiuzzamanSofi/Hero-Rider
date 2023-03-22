import React from 'react'

function LoadingSpinner() {
    return (
        <div
            className='flex justify-center items-center md:absolute top-0 right-0 left-0 bottom-0 my-10 md:my-0'
        >



            Processing... <progress className="progress w-56"></progress>


        </div>
    )
}

export default LoadingSpinner