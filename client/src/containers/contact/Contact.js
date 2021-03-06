import changeTitle from '../../utils/changeTitle.js'
import './contact.css'

const Contact = () => {
    changeTitle('Contact');
    return (
        <section className="contact vh70-box">
            <h2>Get in touch</h2>
            <form className="contact-form" action="https://formsubmit.co/5bf66164d66b145c3a3943239c12c1d3" method="POST">
                <label htmlFor="name">Full name:</label>
                <input type="text" name="name" placeholder="Full name" required />
                <label htmlFor="email">Email Address:</label>
                <input type="email" name="email" placeholder="Email address" required />
                <label htmlFor="message">Message:</label>
                <textarea placeholder="Your Message" name="message" cols="30" rows="10"></textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    )
}

export default Contact
