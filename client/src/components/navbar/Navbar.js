import { Link, useNavigate } from 'react-router-dom'
import UserDropDown from '../userDropDown/UserDropDown.js'
import './navbar.css'
import { AiOutlineSearch } from 'react-icons/ai';
import { useUserContext } from '../../context/UserContext.js';
import ThemeSwitch from '../themeSwitch/ThemeSwitch.js';
const Navbar = () => {
    const { state: { isAuthenticated } } = useUserContext();
    const navigate = useNavigate();

    const onSearch = (e) => {
        if(e.key === 'Enter'){
            navigate(`/search?q=${e.target.value}`);
        }
    }

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
                        <input type="text" className="navigation-search-input" placeholder="Search.." onKeyDown={onSearch}/>
                        <span className="navigation-search-highlight"></span>
                        <AiOutlineSearch className="search-icon" />
                    </div>
                </div>
                <div className="navigation-links">
                    <ThemeSwitch />
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
