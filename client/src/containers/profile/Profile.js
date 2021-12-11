import './profile.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FollowersRow from '../../components/followersRow/FollowersRow.js';
import SubmissionsRow from '../../components/submissionsRow/SubmissionsRow.js';
import ProfileDataBar from '../../components/profileDataBar/ProfileDataBar.js';

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
            <ProfileDataBar userData={userData} username={username}/>
            <SubmissionsRow userData={userData} type="submissions" />
            <SubmissionsRow userData={userData} type="favourites" />
            <FollowersRow followers={userData.followers} text='Followers' />
            <FollowersRow followers={userData.following} text='Following' />

        </section>
    )
}

export default Profile
