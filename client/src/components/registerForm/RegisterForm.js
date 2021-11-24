import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import FormInput from '../formInput/FormInput.js'
import './registerForm.css'
import authService from '../../services/authService.js'
import UserContext from '../../context/UserContext.js'

const RegisterForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { dispatch } = useContext(UserContext);
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        birthdate: ""
    });

    const inputs = [
        {
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            label: 'Username:',
            errorMessage: 'Username must be at least 5 characters and contain only alphanumeric characters and underscore "_"',
            pattern: "^[a-zA-Z0-9_]+$",
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email:',
            errorMessage: 'Please enter a valid email address',
            pattern: "^[A-Za-z0-9_\.]+@+[A-Za-z]+\.+[A-Za-z]+$",
            required: true,
        },
        {
            name: 'birthdate',
            type: 'date',
            label: 'Date of birth:'
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Passowrd',
            label: 'Password:',
            errorMessage: 'Password must be at least 8 characters long',
            pattern: ".{8,}",
            required: true,
        },
        {
            name: 'repeatPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            label: 'Confirm Password:',
            errorMessage: 'Passwords do not match',
            pattern: values.password,
            required: true,
            lastField:true,
        }
    ];

    const submitHandler = (e) => {
        e.preventDefault();
        authService.register(values)
            .then(data => {
                dispatch({ type: 'LOGIN', payload: data.data });
                setIsLoggedIn(true);
            })
            .catch(err => console.log(err.response.data));
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    
    if (isLoggedIn) return <Navigate to="/" />;
    return (
        <form className="register-form" onSubmit={submitHandler}>
            {inputs.map(input => <FormInput key={input.name} {...input} value={values[input.name]} onChange={onChange} />)}
            <button type="submit">Submit</button>
        </form>
    )
}

export default RegisterForm
