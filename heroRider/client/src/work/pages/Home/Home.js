import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function Home() {
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