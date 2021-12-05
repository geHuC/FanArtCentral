import { Link } from 'react-router-dom'
import './about.css'

const About = () => {
    return (
        <section className="about">
            <h1>About</h1>
            <h2>FanArt Central</h2>
            <p>The site is built as a <a href="https://softuni.bg/" target="_blank">SoftUni</a> course project by <a href="https://github.com/geHuC/" target="_blank">Denis Velkov</a>. </p> 
            <p> Underneath the hood it utilizes the MERN (Mongo,Express,React,Node) technological stack.</p>
            <p>The source code for the project can be found on GitHub <a href="https://github.com/geHuC/FanArtCentral" target="_blank">here</a></p>
        </section>
    )
}

export default About
