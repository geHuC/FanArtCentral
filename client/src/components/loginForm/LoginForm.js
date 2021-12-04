import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext.js';
import authService from '../../services/authService.js';
import FormInput from '../formInput/FormInput.js';
import './loginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const inputs = [
        {
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            label: 'Username:',
            errorMessage: 'Username must be at least 5 characters and contain only alphanumeric characters and underscore "_"',
            required: true,
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Passowrd',
            label: 'Password:',
            errorMessage: 'Password must be at least 8 characters long',
            required: true,
        },
    ];

    const submitHandler = (e) => {
        e.preventDefault();
        authService.login(values)
            .then(data => {
                dispatch({ type: 'LOGIN', payload: data.data })
                navigate(-1);
            })
            .catch(err => console.log(err));
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <form className="login-form" onSubmit={submitHandler}>
            {inputs.map(input => <FormInput key={input.name} {...input} value={values[input.name]} onChange={onChange} />)}
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm


