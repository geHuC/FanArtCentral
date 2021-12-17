import { useEffect } from 'react'
import './login.css'
import LoginForm from '../../components/loginForm/LoginForm.js'
import { Link } from 'react-router-dom'
import changeTitle from '../../utils/changeTitle.js'

const Login = () => {
    useEffect(() => {
        changeTitle('Login')
    }, [])
    return (
        <section className="login">
            <div className="login-left-side">
                <h2>FanArt Central</h2>
                <h3>Your first stop into the world of FanArt</h3>
            </div>
            <div className="login-right-side">
                <h2>Login</h2>
                <LoginForm />
                <span>Not a member? <Link to="/register" >Sign Up!</Link></span>
            </div>
        </section>
    )
}

export default Login




