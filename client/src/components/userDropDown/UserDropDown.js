import './userDropDown.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogout, AiOutlineSetting, AiOutlineStar } from 'react-icons/ai'
import { useUserContext } from '../../context/UserContext.js';

const UserDropDown = () => {
    const { state: { user }, dispatch } = useUserContext();
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
                <Link to={`/${user.username}/favourites`} ><p className="user-dropdown-menu-item"><AiOutlineStar /> Favourites</p></Link>
                <Link to={'/settings'} ><p className="user-dropdown-menu-item"><AiOutlineSetting /> Settings </p></Link>
                <p className="user-dropdown-menu-item logout" onClick={() => { dispatch({ type: 'LOGOUT' }) }}><AiOutlineLogout /> Logout </p>
            </ul>}
        </div>
    )
}

export default UserDropDown
