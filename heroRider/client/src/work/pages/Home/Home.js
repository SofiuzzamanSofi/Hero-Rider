import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function Home() {
    return (
        <div>
            <div><Header></Header></div>
            <div className='middle-div relative'>
                <Outlet></Outlet>
            </div>
            <div><Footer></Footer></div>
        </div>
    )
}

export default Home