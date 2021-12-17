import './loginForm.css';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext.js';
import authService from '../../services/authService.js';
import FormInput from '../formInput/FormInput.js';

const LoginForm = () => {
    const { dispatch } = useUserContext();
    const [serverError, setServerError] = useState(false);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const submitHandler = (e) => {
        setServerError(false);
        e.preventDefault();
        authService.login(values)
            .then(data => {
                dispatch({ type: 'LOGIN', payload: data.data })
                navigate(-1, { replace: true });
            })
            .catch(err => { setServerError(true); console.log(err); });
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <form className="login-form" onSubmit={submitHandler}>
            <FormInput
                classes={serverError ? 'form-input-invalid' : ''}
                name="username"
                type="text"
                placeholder="Username"
                label="Username:"
                errorMessage={serverError ? "Username or password invalid" : "Username is required"}
                required={true}
                value={values['username']}
                onChange={onChange}
                invalid={serverError}
            />
            <FormInput
                classes={serverError ? 'form-input-invalid' : ''}
                name="password"
                type="password"
                placeholder="Password"
                label="Password:"
                errorMessage={serverError ? "Username or password invalid" : "Passoword is required"}
                required={true}
                value={values['password']}
                onChange={onChange}
                invalid={serverError}
            />
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm


