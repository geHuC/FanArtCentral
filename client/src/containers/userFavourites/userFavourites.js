import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../../components/carousel/Carousel.js';
import ProfileDataBar from '../../components/profileDataBar/ProfileDataBar.js';

const UserFavourites = () => {
    const location = useLocation()
    const { username } = useParams();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username === location.state?.userData?.username) {
            setUserData(location.state?.userData);
            setLoading(false)
            return;
        }
        axios.get(`http://localhost:3030/api/v1/users/get/${username}`)
            .then(res => {
                setUserData(res.data);
                setLoading(false);
            })
            .catch(err => { console.log(err); setLoading(false) })
    }, [username, location])

    if (loading) return (<div>Loading...</div>);

    return (
        <>
            <section className="user-favourites">
                <div className="data-bar">
                    <ProfileDataBar userData={userData} username={username} label="Favourites" />
                </div>
                <Carousel submissions={userData.favourites} />
            </section>
        </>
    )
}

export default UserFavourites
