import './usernameHoverCard.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import userService from '../../services/userService.js';
import { Link } from 'react-router-dom';
import FollowButton from '../followButton/FollowButton.js';
import { useUserContext } from '../../context/UserContext.js';
import useWindowDimensions from '../../hooks/useWindowDimensions.js';

const UsernameHoverCard = ({ username, externalClass }) => {
    const [userData, setUserData] = useState({});
    const [showCard, setShowCard] = useState(false);
    const [cardLocation, setCardLocation] = useState({})
    const { state: { user } } = useUserContext();
    const [wait, setWait] = useState(false)
    const pagewidth = useWindowDimensions();
    const nameRef = useRef();

    useEffect(() => {
        window.addEventListener('scroll', mouseLeaveHandler, { passive: true });

        return () => {
            window.removeEventListener('scroll', mouseLeaveHandler);
        };
    }, []);

    const mouseEnterHandler = useCallback(() => {
        const { x, y, width, height } = nameRef.current.getBoundingClientRect();
        let top = y - 240;
        let left = (x + (width / 2));
        if (top < 0) {
            top = y + height;
        }
        if (left < 0) {
            left = x;
        }
        if (left + 120 > pagewidth) {
            left = x + width - 240;
        }
        setCardLocation({ top: `${top}px`, left: `${left}px` });
        if (!userData.username) {
            setWait(true);
            userService.getByUsername(username)
                .then(res => {
                    setUserData(res.data);
                    setShowCard(true);
                    setWait(false)
                })
                .catch(err => { console.log(err); setWait(false) })
        } else {
            setShowCard(true);
        }
    })

    const mouseLeaveHandler = () => {
        setShowCard(false);
    }
    return (
        <div className="username-hover-container" onMouseLeave={mouseLeaveHandler} onMouseEnter={mouseEnterHandler} onScroll={mouseLeaveHandler}>
            <Link to={`/${username}`} className={`${externalClass && externalClass} ${wait && 'wait'}`} ref={nameRef}  >{username}</Link>
            {showCard && <div className="username-hover-card" style={cardLocation}>
                <div className="username-hover-card-avatar-container">
                    <img src={userData.avatar} alt="avatar" />
                </div>
                <Link className="uhc-username" to={`/${username}`} >{username}</Link>
                <span className='uhc-fullname'>{userData.fullname}</span>
                <div className="username-hover-card-stats">
                    <span>{userData.submissions.length} Submissions</span>
                    <span>{userData.followers.length} Followers</span>
                </div>
                <div className="username-hover-card-submissions">
                    {userData.submissions.slice(0, 3).map(x => <div key={x._id} className="uhc-submission">
                        <Link to={`/${username}/art/${x.slug}`}><img src={x.thumbUrl} alt="submission" /></Link>
                    </div>)}
                    {userData.submissions.length > 3 && <div className="uhc-submission">
                        <Link to={`/${userData.username}/submissions`} state={{ userData }} className="uhc-last-link"> see all </Link><img src={userData.submissions[3].thumbUrl} alt="submission" /></div>}
                </div>
                {user && (user.username !== userData.username && <FollowButton author={userData} />)}
            </div>}
        </div>
    )
}

export default UsernameHoverCard
