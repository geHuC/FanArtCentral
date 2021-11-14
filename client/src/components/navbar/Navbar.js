import React from 'react'
import './navbar.css'

const Navbar = () => {
    return (
        <div className="navigation">
            <div className="navigation-container">
                <div className="navigation-logo" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/';
                }}>
                    <p className="logo-top">FanArt</p>
                    <p className="logo-bottom">Central</p>
                </div>
                <div className="navigation-search">
                    <div className="navigation-search-wrapper">
                        <input type="text" className="navigation-search-input" placeholder="Search.." />
                        <span className="navigation-search-highlight"></span>
                    </div>
                </div>
                <div className="navigation-links">
                    <p><a href="/create">Submit</a></p>
                    <p><a href="/login">Sign in</a></p>
                    <p><a href="/register">Sign up</a></p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
