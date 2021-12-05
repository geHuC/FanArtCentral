import { useContext, useEffect, useState } from 'react'
import SubmissionCard from '../../components/submissionCard/SubmissionCard.js';
import UserContext from '../../context/UserContext.js'
import submissionService from '../../services/submissionService.js';
import './feed.css'

const Feed = () => {
    const { state: { user } } = useContext(UserContext);
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
    }, [user, sort])

    const sortByNewest = () => {
        if(sort !== 'newest') setSort('newest');
    }
    const sortByOldest = () => {
        if(sort !== 'oldest') setSort('oldest');
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
            <div className="feed-container">
                {loading ? <p>Loading...</p> : data.map(submission => <SubmissionCard key={submission._id} {...submission} />)}
            </div>
        </section>
    )
}

export default Feed
