import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom';

import FollowButton from '../../components/followButton/FollowButton.js'
import prettyNumbers from '../../utils/prettyNumbers.js';
import Carousel from '../../components/carousel/Carousel.js';

const Profile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState({});
    const [waiting, setWaiting] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:3030/api/v1/users/get/${username}`)
            .then(res => {
                setUserData(res.data);
                setWaiting(false);
            })
            .catch(err => { console.log(err); setWaiting(false) })
    }, [username])

    if (waiting) return (<div>Loading...</div>);

    return (
        <section className="profile-container">
            <div className="profile-data">
                <div className="pd-left">
                    <img src="/static/noAvatar.png" alt="avatar" />
                </div>
                <div className="pd-right">
                    <div className="pd-username">
                        <span>{userData.username}</span>
                        {/* <FollowButton /> */}

                    </div>
                    <p className="pd-full-name">
                        <span>{userData.fullname}</span>
                    </p>
                    <div className="pd-statistics">
                        <span>{prettyNumbers(userData.submissions.length)} Submissions</span>
                        <span>{prettyNumbers(userData.submissions.reduce((a, b) => a + b.views, 0))} Submission views</span>
                        <span>{prettyNumbers(userData.followers.length)} Followers</span>
                    </div>
                </div>
            </div>
            <div className="p-latest-submissions">
                <Carousel submissions={userData.submissions} />
            </div>
        </section>
    )
}

export default Profile
