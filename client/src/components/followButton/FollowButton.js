import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext.js';
import './followButton.css'

const FollowButton = ({ author }) => {
    const [follow, setFollow] = useState(false);
    const [followSymbol, setFollowSymbol] = useState('✓');
    const [waiting, setWaiting] = useState(false);
    const { state: { user, token } } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            if (author.followers.some(x => x === user._id)) {
                setFollow(true);
            }
        }
    }, [author, user]);

    const mouseOverHandler = (e) => {
        setFollowSymbol('✕');
    }
    const mouseLeaveHandler = (e) => {
        setFollowSymbol('✓');
    }

    const followHandler = (e) => {
        e.preventDefault()
        setWaiting(true);
        axios.get(`http://localhost:3030/api/v1/users/follow/${author.username}`, {
            headers: {
                'X-Authorization': token
            }
        })
            .then(data => { setWaiting(false); setFollow(true) })
            .catch(err => { console.log(err); setWaiting(false) })
    }
    const unfollowHandler = (e) => {
        e.preventDefault()
        setWaiting(true);
        axios.get(`http://localhost:3030/api/v1/users/unfollow/${author.username}`, {
            headers: {
                'X-Authorization': token
            }
        })
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
