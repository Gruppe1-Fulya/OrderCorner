import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { retrieveAllUsernamesApi, retrieveAllPasswordsApi } from '../../api/CustomerApiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons'


const Login = () => {

    const navigate = useNavigate();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordType, setPasswordType ] = useState("password");
    /*
    const [ customerInfos, setCustomerInfos ] = useState([{
        "username": null,
        "password": null,
    }]);
    */
    const [ enteredUsername, setEnteredUsername ] = useState("");
    const [ enteredPassword, setEnteredPassword ] = useState(""); 
    const [ isLoginAuthenticated, setLoginAuthenticated ] = useState(false);
    

    const retrieveUsernames = () => {
        retrieveAllUsernamesApi()
        .then(response => setUsername(response.data));
    };

    useEffect(
        () => retrieveUsernames(), []
    );

    const retrievePasswords = () => {
        retrieveAllPasswordsApi()
        .then(response => setPassword(response.data));
    };

    useEffect(
        () => retrievePasswords(), []
    );

    const inputUsernameChangeHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value.length);
        setEnteredUsername(event.target.value);
        console.log(enteredUsername);
        /*
        setCustomerInfos((customerInfos) => ({
            ...customerInfos,
            [input]: value
        }));
        console.log(customerInfos);
        */
    };

    const inputPasswordChangeHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setEnteredPassword(event.target.value);
        console.log(enteredPassword);
    }

    const checkAuthenticatedLogin = ( ) => {
        console.log(username, enteredUsername);
        console.log(password, enteredPassword);
        if (enteredUsername === username && enteredPassword === password) {
            setLoginAuthenticated(true);
        }
        else {
            setLoginAuthenticated(false);
        }
        console.log(isLoginAuthenticated);
    }

    const togglePassword = () => {
        if (passwordType === "password")
        {
            setPasswordType("text")
            return;
        }
        setPasswordType("password");
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <form className='form'>
                <div className='input-group'>
                    <label className='labels'>Username</label>
                    <input
                    type='text'
                    name='username'
                    placeholder="Enter your username..."
                    onChange={(event) => inputUsernameChangeHandler(event)}
                    />
                </div>
                <div className='input-group'>
                    <label className='labels'>Password</label>
                    <input
                    type={passwordType}
                    name='password'
                    placeholder="Enter your password..."
                    onChange={(event) => inputPasswordChangeHandler(event)}
                    />
                    {passwordType==="password" ? <FontAwesomeIcon onClick={togglePassword} icon={faEyeSlash} className="icons"/> : <FontAwesomeIcon onClick={togglePassword} icon={faEye} className="icons"/>}
                </div>
                <button onClick={checkAuthenticatedLogin} type="button" className='button'>Login</button>
            </form>
            <div className='checkLogin'>
                {isLoginAuthenticated ? navigate("/") : <p>Login Failed!</p>}
            </div>
        </div>
    )
}

export default Login;