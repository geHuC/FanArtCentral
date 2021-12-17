import './followerCard.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import userService from '../../services/userService.js';
import UsernameHoverCard from '../usernameHoverCard/UsernameHoverCard.js';

const FollowerCard = ({ userId }) => {
    const [state, setState] = useState({});
    useEffect(() => {
        userService.getSmall(userId)
            .then(res => {
                setState(res.data);
            })
            .catch(err => { console.log(err) })
    }, [userId])
    return (
        <div className='follower-card'>
            <Link to={`/${state.username}`} className='follower-card-link'></Link>
            <div className="follower-card-left">
                <div className="follower-card-img-container">
                    <img src={state.avatar} alt="avatar" />
                </div>
            </div>
            <div className="follower-card-right">
                {/* <span>{state.username}</span> */}
                <UsernameHoverCard username={state.username} externalClass={'cursor-pointer'} />
            </div>

        </div >

    )
}

export default FollowerCard
