
import {useEffect, useState} from 'react'
import SubmissionCard from '../../components/submissionCard/SubmissionCard.js'
import submissionService from '../../services/submissionService.js';
import './home.css'

const Home = () => {
    const [submissions, setSubmissions] = useState([]);
    const [sortType, setSortType] = useState('newest');
    useEffect(() => {
        submissionService.getAll(sortType)
        .then(res => setSubmissions(res.data))
        .catch(err => console.log(err))
    }, [sortType]);

    const newestBtnHandler = () =>{
        if(sortType === 'popular') setSortType('newest');
    }
    const popularBtnHandler = () =>{
        if(sortType === 'newest') setSortType('popular');
    }

    return (
        <div className="home-wrapper">
            <div className="home-sort-bar">
                <span>Order by:</span>
                <button onClick ={newestBtnHandler} className={`home-sort-button ${sortType === 'newest' && 'home-sort-button-selected'}`}>Newest</button>
                <button onClick ={popularBtnHandler} className={`home-sort-button ${sortType === 'popular' && 'home-sort-button-selected'}`}>Popular</button>
            </div>
            <section className="home-submissions">
                {submissions.map(submission => <SubmissionCard key={submission._id} {...submission} />)}
            </section>
        </div>
    )
}

export default Home
