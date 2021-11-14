import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return (
        <div className="navigation">
            <div className="navigation-container">
                <Link to="/">
                    <div className="navigation-logo" >
                        <p className="logo-top">FanArt</p>
                        <p className="logo-bottom">Central</p>
                    </div>
                </Link>
                <div className="navigation-search">
                    <div className="navigation-search-wrapper">
                        <input type="text" className="navigation-search-input" placeholder="Search.." />
                        <span className="navigation-search-highlight"></span>
                    </div>
                </div>
                <div className="navigation-links">
                    <p><Link to="/create">Submit</Link></p>
                    <p><Link to="/login">Sign in</Link></p>
                    <p><Link to="/register">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
