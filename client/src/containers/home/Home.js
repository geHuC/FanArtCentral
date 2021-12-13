import { useEffect, useState } from 'react'
import Carousel from '../../components/carousel/Carousel.js';
import SkeletonCarousel from '../../components/skeletonCarousel/SkeletonCarousel.js';
import submissionService from '../../services/submissionService.js';
import './home.css'

const Home = () => {
    const [submissions, setSubmissions] = useState([]);
    const [sortType, setSortType] = useState('popular');
    const [loading, setLoading] = useState(true);
    const [emptyMsg, setEmptyMsg] = useState('Our archives seem to be empty, be the change we need and submit some content.')
    useEffect(() => {
        setLoading(true);
        submissionService.getAll(sortType)
            .then(res => {
                setSubmissions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setEmptyMsg(`Something went wrong on our end, please try again later.`);
            })
    }, [sortType]);
    
    const newestBtnHandler = () => {
        if (sortType === 'popular') setSortType('newest');
    }
    const popularBtnHandler = () => {
        if (sortType === 'newest') setSortType('popular');
    }

    return (
        <>
            <div className="home-wrapper">
                <div className="home-sort-bar">
                    <span>Order by:</span>
                    <button onClick={newestBtnHandler} className={`home-sort-button ${sortType === 'newest' && 'home-sort-button-selected'}`}>Newest</button>
                    <button onClick={popularBtnHandler} className={`home-sort-button ${sortType === 'popular' && 'home-sort-button-selected'}`}>Popular</button>
                </div>
                {loading 
                ? <SkeletonCarousel />
                : <Carousel submissions={submissions} emptyMsg={emptyMsg}/>}
            </div>
        </>
    )
}

export default Home
