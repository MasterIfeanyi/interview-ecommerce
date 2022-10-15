import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from './Footer'
import Navigation from './Navigation'

const Layout = () => {
    return (
        <main className='App'>
            <Navigation />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout