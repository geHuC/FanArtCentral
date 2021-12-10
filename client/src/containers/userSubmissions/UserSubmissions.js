import './userSubmissions.css'
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../../components/carousel/Carousel.js';

const UserSubmissions = () => {
    const location = useLocation()
    const { username } = useParams();
    const { userData } = location.state;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username === userData?.username) {
            setData(userData.submissions);
            setLoading(false)
            return;
        }
        axios.get(`http://localhost:3030/api/v1/users/get/${username}`)
            .then(res => {
                setData(res.data.submissions);
                setLoading(false);
            })
            .catch(err => { console.log(err); setLoading(false) })
    }, [username])
    return (
        <section className="feed">
            <div className="feed-bar">
                <div className="feed-bar-left">
                    <span className="feed-bar-name">{username}</span>
                    <span>`s Submissions:</span>
                </div>
            </div>
            {loading ? <p>Loading...</p> : <Carousel submissions={data} />}
        </section>
    )
}

export default UserSubmissions
