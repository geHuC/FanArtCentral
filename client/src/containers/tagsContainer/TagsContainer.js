import { useParams } from "react-router-dom"
import "./tagsContainer.css"
import { useEffect, useState } from 'react'
import submissionService from '../../services/submissionService.js';
import Carousel from "../../components/carousel/Carousel.js";
import SkeletonCarousel from "../../components/skeletonCarousel/SkeletonCarousel.js";

const TagsContainer = () => {
    const { tag } = useParams();
    const [sort, setSort] = useState('newest');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        submissionService.getByTag(sort, tag)
            .then(res => {
                setLoading(false);
                setData(res.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [tag, sort])

    const sortByNewest = () => {
        if (sort !== 'newest') setSort('newest');
    }
    const sortByOldest = () => {
        if (sort !== 'oldest') setSort('oldest');
    }

    return (
        <section className="tags-container">
            <div className="feed-bar">
                <div className="feed-bar-left">
                    <span className="tag-bar-explore">Explore tagged:</span>
                    <span className="tag-bar-tag">{tag}</span>
                </div>
                <div className="feed-bar-right">
                    <span>Order by:</span>
                    <button onClick={sortByNewest} className={`feed-bar-button ${sort === 'newest' ? 'feed-bar-selected' : ''}`}>Newest</button>
                    <button onClick={sortByOldest} className={`feed-bar-button ${sort === 'oldest' ? 'feed-bar-selected' : ''}`}>Oldest</button>
                </div>
            </div>
            {loading ? <SkeletonCarousel /> : <Carousel submissions={data} />}
        </section>
    )
}

export default TagsContainer
