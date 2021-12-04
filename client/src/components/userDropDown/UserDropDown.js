import './userDropDown.css'
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext.js';
import { Link } from 'react-router-dom';


const UserDropDown = () => {
    const { state: { user }, dispatch } = useContext(UserContext);
    const [show, setShow] = useState(false);

    const showMenu = () => {
        setShow(true)
    }

    const hideMenu = () => {
        setShow(false)
    }

    return (
        <div className="user-dropdown" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
            <Link to={`/${user.username}`} />
            <div className="user-dropdown-avatar">
                <img src={user.avatar} alt="avatar" />
            </div>
            {show && <ul className="user-dropdown-menu">
                <Link to={`/${user.username}`}><p className="dropdown-menu-username">{user.username}</p></Link>
                <p className="user-dropdown-menu-item">Settings</p>
                <p className="user-dropdown-menu-item" onClick={() => { dispatch({ type: 'LOGOUT' }) }}>Logout</p>
            </ul>}
        </div>
    )
}

export default UserDropDown
