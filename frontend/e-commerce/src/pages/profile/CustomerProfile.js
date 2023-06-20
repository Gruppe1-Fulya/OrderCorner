import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CustomerProfile.css';
import { retrieveCustomerInfosApi, updateCustomerInfosApi } from '../../api/CustomerApiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'


// declare all characters

const CustomerProfile = () => {
    
    const {username} = useParams();
    const [ passwordType, setPasswordType ] = useState("password");
    const [ shoppingPasswordType, setShoppingPasswordType ] = useState("password");

    const [ customerInfos, setCustomerInfos ] = useState([
        {
            'id': null,
            'name': null,
            'lastName': null,
            'username': username,
            'email': null,
            'phoneNumber': null,
            'password': null,
            'shoppingPassword': null,
            'wallet': 0
        }
    ])

    const retrieveCustomerInfos = () => {
        retrieveCustomerInfosApi(username)
        .then((response) => {
            setCustomerInfos(customerInfos => ({
                ...customerInfos,
                'name': response.data.name , 'lastName': response.data.lastName, 'email': response.data.email, 'phoneNumber': response.data.phoneNumber, 'password': response.data.password, 'shoppingPassword': response.data.shoppingPassword, 'wallet': response.data.wallet
            }))
            // console.log(response);
        })
        .catch(error => console.log(error));
    };

    useEffect (
        () => retrieveCustomerInfos(), []
    )



    const inputChangeHandler = (input, value) => {
        console.log(value);
        setCustomerInfos((customerInfos) => ({
            ...customerInfos,
            [input]: value
        }));
        console.log(customerInfos);
    };

    // Password toggle handler
    const toggleShoppingPassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    if (shoppingPasswordType === "password")
    {
        setShoppingPasswordType("text")
        return;
    }
    setShoppingPasswordType("password");
    };

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        if (passwordType === "password")
        {
            setPasswordType("text")
            return;
        }
        setPasswordType("password");
    };

    const saveChanges = () => {
        updateCustomerInfosApi(username, customerInfos["name"], customerInfos["lastName"], customerInfos["phoneNumber"], customerInfos["wallet"])
        .then(response => console.log(response))
        .catch(error => console.log(error));
    };

    return (
        <div className='UserProfile'>
            <h2 className='Header'>User Profile</h2>
            <form className='form'>
                <div className='input-group'>
                <p>
                    <label htmlFor='firstName'>Name</label>
                    <input 
                    onChange={(event) => inputChangeHandler('name',event.target.value)}
                    defaultValue={customerInfos['name']}
                    type='text'
                    />
                </p>
                <p>
                    <label htmlFor='lastName'>Last Name</label>
                    <input 
                    onChange={(event) => inputChangeHandler('lastName',event.target.value)}
                    defaultValue={customerInfos['lastName']}
                    type='text'
                    />
                </p>
                <p>
                    <label htmlFor='username'>Username</label>
                    <input 
                    onChange={(event) => inputChangeHandler('username',event.target.value)}
                    defaultValue={username}
                    type='text'
                    />
                </p>
                <p>
                    <label htmlFor='email'>E-Mail</label>
                    <input 
                    onChange={(event) => inputChangeHandler('email',event.target.value)}
                    type='text'
                    defaultValue={customerInfos['email']}
                    />
                </p>
                <p>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input 
                    onChange={(event) => inputChangeHandler('phoneNumber',event.target.value)}
                    type='text'
                    defaultValue={customerInfos['phoneNumber']}
                    />
                </p>
                <p>
                    <label htmlFor='Password'>Password</label>
                    <input type={passwordType}
                    defaultValue={customerInfos['password']}
                    />
                    {passwordType==="password" ? <FontAwesomeIcon onClick={togglePassword} icon={faEyeSlash} className="icons"/> : <FontAwesomeIcon onClick={togglePassword} icon={faEye} className="icons"/>}
                </p>
                <p>
                    <label htmlFor='shoppingPassword'>Shopping Password</label>
                    <input type={shoppingPasswordType}
                    defaultValue={customerInfos['shoppingPassword']}
                    />
                    {shoppingPasswordType==="password" ? <FontAwesomeIcon onClick={toggleShoppingPassword} icon={faEyeSlash} className="icons"/> : <FontAwesomeIcon onClick={toggleShoppingPassword} icon={faEye} className="icons"/>}
                </p>
                <p>
                    <label htmlFor='wallet'>Wallet</label>
                    <input 
                    onChange={(event) => inputChangeHandler('wallet',event.target.value)}
                    type='number'
                    defaultValue={customerInfos['wallet']}
                    />
                </p>
                </div>
                <p className="actions">
                    <button type="submit" className="button" onClick={saveChanges}>
                        Save Changes
                    </button>
                </p>
            </form>
        </div>
    )
}

export default CustomerProfile;