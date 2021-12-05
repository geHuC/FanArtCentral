import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import SubmissionCard from '../../components/submissionCard/SubmissionCard.js';
import submissionService from '../../services/submissionService.js';

const Search = () => {
    const searchParams = useLocation().search;
    const [sort, setSort] = useState('newest');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const prettySearch = searchParams.split('=')[1].split('%20').join(' ');

    useEffect(() => {
        submissionService.getBySearch(searchParams, sort)
            .then(res => { setLoading(false); setData(res.data) })
            .catch(err => { setLoading(false); console.log(err); })
    }, [searchParams, sort])

    const sortByNewest = () => {
        if (sort !== 'newest') setSort('newest');
    }
    const sortByOldest = () => {
        if (sort !== 'oldest') setSort('oldest');
    }
    return (
        <section className="search-section">
            <div className="feed-bar">
                <div className="feed-bar-left">
                    <span className="tag-bar-explore">Search terms:</span>
                    <span className="tag-bar-tag">{prettySearch}</span>
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

export default Search
