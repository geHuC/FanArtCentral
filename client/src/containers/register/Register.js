import { Link } from 'react-router-dom'
import RegisterForm from '../../components/registerForm/RegisterForm.js'
import './register.css'

const Register = () => {
    return (
        <section className="register">
            <div className="register-left-side">
                <h2>FanArt Central</h2>
                <h3>Your first stop into the world of FanArt</h3>
            </div>
            <div className="register-right-side">
                <h2>Register</h2>
                <RegisterForm />
                <span>Already a member? <Link to="/login" >Sign In!</Link></span>
            </div>

        </section>
    )
}

export default Register




