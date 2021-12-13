import './profile.css'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import FollowersRow from '../../components/followersRow/FollowersRow.js';
import SubmissionsRow from '../../components/submissionsRow/SubmissionsRow.js';
import ProfileDataBar from '../../components/profileDataBar/ProfileDataBar.js';
import userService from '../../services/userService.js';
import LoadingDots from '../../components/loadintDots/LoadingDots.js';

const Profile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState({});
    const [waiting, setWaiting] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        userService.getByUsername(username)
            .then(res => {
                setUserData(res.data);
                setWaiting(false);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    return navigate('/404');
                }
                setWaiting(false)
            })
    }, [username])


    if (waiting) return <LoadingDots />;

    return (
        <section className="profile-container">
            <ProfileDataBar userData={userData} username={username} />
            <SubmissionsRow userData={userData} type="submissions" />
            <SubmissionsRow userData={userData} type="favourites" />
            <div className="profile-container-bottom">
                <div className="profile-container-bottom-left">
                    <FollowersRow followers={userData.followers} text='Followers' />
                    <FollowersRow followers={userData.following} text='Following' />
                </div>
                <div className="profile-container-bottom-right">
                    <span>Bio:</span>
                    <div className="profile-container-bottom-right-bio">
                        {userData.bio}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
