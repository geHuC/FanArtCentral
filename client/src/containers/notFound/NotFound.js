import './notFound.css'
import { useEffect } from 'react';
import changeTitle from '../../utils/changeTitle.js';

const NotFound = () => {
    useEffect(() => {
        changeTitle('404 Not found');
    }, [])
    return (
        <section className="not-found-404">
            <div className="vh70-box">
                <h1>Error 404!</h1>
                <h3>Those aren't the droids you are looking for...</h3>
            </div>
        </section>
    )
}

export default NotFound
