import './followerCard.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const FollowerCard = ({ userId }) => {
    const [state, setState] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:3030/api/v1/users/getSmall/${userId}`)
            .then(res => {
                setState(res.data);
            })
            .catch(err => { console.log(err) })
    }, [userId])
    return (
        <Link to={`/${state.username}`} style={{ textDecoration: 'none', maxWidth:'13.5rem' }} >
            <div className='follower-card'>
                <div className="follower-card-left">
                    <div className="follower-card-img-container">
                        <img src={state.avatar} alt="avatar" />
                    </div>
                </div>
                <div className="follower-card-right">
                    <span>{state.username}</span>
                </div>

            </div>
        </Link>
    )
}

export default FollowerCard
