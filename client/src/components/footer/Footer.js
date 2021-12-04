import './footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-links">
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-copywritght">
                <p>© Denis Velkov 2021.</p>
            </div>
        </div>
    )
}

export default Footer
