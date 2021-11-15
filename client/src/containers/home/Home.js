
import './home.css'

const Home = () => {
    return (
        <div className="home-wrapper">
            <div className="home-sort-bar">
                <button className="home-sort-button">Popular</button>
                <button className="home-sort-button home-sort-button-selected">Newest</button>
            </div>
        </div>
    )
}

export default Home
