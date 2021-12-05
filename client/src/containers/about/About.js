import { Link } from 'react-router-dom'
import './about.css'

const About = () => {
    return (
        <section className="about">
            <h1>About</h1>
            <h2>FanArt Central</h2>
            <p>The site is built as a <Link to={{ pathname: "https://softuni.bg/" }} target="_blank">SoftUni</Link> course project by <Link to={{ pathname: "https://github.com/geHuC/" }} target="_blank">Denis Velkov</Link>. </p> 
            <p> Underneath the hood it utilizes the MERN (Mongo,Express,React,Node) technological stack.</p>
            <p>The source code for the project can be found on GitHub <Link to={{ pathname: "https://github.com/geHuC/FanArtCentral" }} target="_blank">here</Link></p>
        </section>
    )
}

export default About
