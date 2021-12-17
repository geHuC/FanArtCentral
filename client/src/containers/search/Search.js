import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Carousel from '../../components/carousel/Carousel.js';
import SkeletonCarousel from '../../components/skeletonCarousel/SkeletonCarousel.js';
import submissionService from '../../services/submissionService.js';
import changeTitle from '../../utils/changeTitle.js';

const Search = () => {
    const searchParams = useLocation().search;
    const [sort, setSort] = useState('newest');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const prettySearch = searchParams.split('=')[1].split('%20').join(' ');

    useEffect(() => {
        changeTitle(`Search results for ${searchParams}`);
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
            {loading ? <SkeletonCarousel /> : <Carousel submissions={data} emptyMsg={`We looked everywhere and couldn't find any ${prettySearch} content. Be the first to submit it.`}/>}
        </section>
    )
}

export default Search
