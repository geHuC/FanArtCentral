import './feed.css'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext.js'
import Carousel from '../../components/carousel/Carousel.js';
import submissionService from '../../services/submissionService.js';

const Feed = () => {
    const { state: { user } } = useUserContext()
    const [sort, setSort] = useState('newest');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        submissionService.getFeed(sort)
            .then(res => {
                setLoading(false);
                setData(res.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [user,sort])

    const sortByNewest = () => {
        if (sort !== 'newest') setSort('newest');
    }
    const sortByOldest = () => {
        if (sort !== 'oldest') setSort('oldest');
    }
    return (
        <section className="feed">
            <div className="feed-bar">
                <div className="feed-bar-left">
                    <span className="feed-bar-name">{user.username}</span>
                    <span>`s Feed:</span>
                </div>
                <div className="feed-bar-right">
                    <span>Order by:</span>
                    <button onClick={sortByNewest} className={`feed-bar-button ${sort === 'newest' ? 'feed-bar-selected' : ''}`}>Newest</button>
                    <button onClick={sortByOldest} className={`feed-bar-button ${sort === 'oldest' ? 'feed-bar-selected' : ''}`}>Oldest</button>
                </div>
            </div>
            {loading ? <p>Loading...</p> : <Carousel submissions={data} />}
        </section>
    )
}

export default Feed
