import './home.css'
import { useEffect, useRef, useState } from 'react'
import Carousel from '../../components/carousel/Carousel.js';
import LoadingDots from '../../components/loadintDots/LoadingDots.js';
import SkeletonCarousel from '../../components/skeletonCarousel/SkeletonCarousel.js';
import submissionService from '../../services/submissionService.js';

const Home = () => {
    const [submissions, setSubmissions] = useState([]);
    const [sortType, setSortType] = useState('popular');
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [emptyMsg, setEmptyMsg] = useState('Our archives seem to be empty, be the change we need and submit some content.');
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const loader = useRef(null);

    useEffect(() => {
        submissionService.getAll(sortType, page)
            .then(res => {
                if (res.data.length < 20) setLastPage(true);
                setSubmissions(state => [...state, ...res.data]);
                setInitialLoading(false);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setInitialLoading(false);
                setLoading(false);
                setEmptyMsg(`Something went wrong on our end, please try again later.`);
            })
    }, [sortType, page]);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            if (!lastPage) {
                setLoading(true);
                setPage((page) => page + 1)
            }
        }
    }

    const newestBtnHandler = () => {
        if (sortType === 'newest') return;
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
        setSortType('newest');
        setPage(0);
        setInitialLoading(true);
        setSubmissions([]);
        setLastPage(false);
    }
    const popularBtnHandler = () => {
        if (sortType === 'popular') return;
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
        setSortType('popular');
        setPage(0);
        setInitialLoading(true);
        setSubmissions([]);
        setLastPage(false);
    }

    return (
        <>
            <div className="home-wrapper">
                <div className="home-sort-bar">
                    <span>Order by:</span>
                    <button onClick={newestBtnHandler} className={`home-sort-button ${sortType === 'newest' && 'home-sort-button-selected'}`}>Newest</button>
                    <button onClick={popularBtnHandler} className={`home-sort-button ${sortType === 'popular' && 'home-sort-button-selected'}`}>Popular</button>
                </div>
                {initialLoading
                    ? <SkeletonCarousel />
                    : <Carousel submissions={submissions} emptyMsg={emptyMsg} />}
                {loading && <LoadingDots />}
                {!lastPage && <div ref={loader} className="load-more"></div>}
            </div>
        </>
    )
}

export default Home
