import './followButton.css'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext.js';
import userService from '../../services/userService.js';
import { useNavigate } from 'react-router-dom'

const FollowButton = ({ author }) => {
    const [follow, setFollow] = useState(false);
    const [followSymbol, setFollowSymbol] = useState('✓');
    const [waiting, setWaiting] = useState(false);
    const { state: { user, isAuthenticated } } = useUserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            if (author.followers.some(x => x === user._id)) {
                setFollow(true);
            }
        }
    }, [author, user, isAuthenticated]);

    const mouseOverHandler = (e) => {
        setFollowSymbol('✕');
    }
    const mouseLeaveHandler = (e) => {
        setFollowSymbol('✓');
    }

    const followHandler = (e) => {
        e.preventDefault()
        if (!isAuthenticated) navigate('/login');
        setWaiting(true);
        userService.follow(author.username)
            .then(data => { setWaiting(false); setFollow(true) })
            .catch(err => { console.log(err); setWaiting(false) })
    }
    const unfollowHandler = (e) => {
        e.preventDefault()
        if (!isAuthenticated) navigate('/login');
        setWaiting(true);
        userService.unfollow(author.username)
            .then(data => { setWaiting(false); setFollow(false) })
            .catch(err => { console.log(err); setWaiting(false) })

    }
    return (
        <>
            {follow
                ? <button
                    className={`follow-button follow-button-following ${waiting ? 'wait' : ''}`}
                    onMouseOver={mouseOverHandler}
                    onMouseLeave={mouseLeaveHandler}
                    onClick={unfollowHandler}> {followSymbol} Following</button>

                : <button
                    className={`follow-button follow-button-not-following ${waiting ? 'wait' : ''}`}
                    onClick={followHandler}> +Follow</button>
            }
        </>
    )
}

export default FollowButton
