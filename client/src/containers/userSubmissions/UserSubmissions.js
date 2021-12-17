import './userSubmissions.css'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Carousel from '../../components/carousel/Carousel.js';
import ProfileDataBar from '../../components/profileDataBar/ProfileDataBar.js';
import LoadingDots from '../../components/loadintDots/LoadingDots.js';
import changeTitle from '../../utils/changeTitle.js';
import userService from '../../services/userService.js';

const UserSubmissions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = useParams();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        changeTitle(`${username}'s favourites`);
        if (username === location.state?.userData?.username) {
            setUserData(location.state?.userData);
            setLoading(false)
            return;
        }
        userService.getByUsername(username)
            .then(res => {
                setUserData(res.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    return navigate('/404');
                }
                setLoading(false)
            })
    }, [username, location, navigate])

    if (loading) return <LoadingDots />;

    return (
        <>
            <section className="user-favourites">
                <div className="data-bar">
                    <ProfileDataBar userData={userData} username={username} label="Submissions" />
                </div>
                <Carousel submissions={userData.submissions} emptyMsg={`${username} has no submissions yet`}/>
            </section>
        </>
    )
}

export default UserSubmissions
