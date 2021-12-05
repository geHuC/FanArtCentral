import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext.js'
import UserDropDown from '../userDropDown/UserDropDown.js'
import './navbar.css'

const Navbar = () => {
    const { state: { isAuthenticated }, dispatch } = useContext(UserContext);
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
                    {isAuthenticated
                        ? <>
                            <p className="feed-link"><Link to="/feed">Feed</Link></p>
                            <p><Link to="/submit">Submit</Link></p>
                            <UserDropDown />
                            
                        </>
                        : <>
                            <p className="sign-in-link"><Link to="/login">Sign in</Link></p>
                            <p><Link to="/register">Sign up</Link></p>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
