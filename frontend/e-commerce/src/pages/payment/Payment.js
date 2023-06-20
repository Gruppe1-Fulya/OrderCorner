import React, { useEffect, useState } from 'react'
import { retrieveCustomerWalletApi, retrieveTotalCartAmountApi, updateCustomerWalletApi, getShoppingPasswordApi } from '../../api/CustomerApiService';
import { useParams } from 'react-router-dom';

const Payment = () => {

    const {username} = useParams();
    const [ totalCartAmount, setTotalCartAmount ] = useState(0);
    const [ customerWallet, setCustomerWallet ] = useState(0);
    const [ isWalletEnough, setWalletEnough ] = useState(false);
    const [ shoppingPassword, setShoppingPassword ] = useState(""); 
    const [ isPasswordEntered, setPasswordEntered ] = useState(false);
    const [ enteredPassword, setEnteredPassword ] = useState("");


    const retrieveTotalCartAmount = () => {
        retrieveTotalCartAmountApi("anlcmlysr")
        .then(response => setTotalCartAmount(response.data));
    }

    useEffect(
        () => retrieveTotalCartAmount(), []
    );

    const retrieveCustomerWallet = username => {
        retrieveCustomerWalletApi(username)
        .then(response => setCustomerWallet(response.data));
    }

    useEffect(
        () => retrieveCustomerWallet(username), [username]
    );

    const getShoppingPassword = (username) => {
        getShoppingPasswordApi(username)
        .then(response => setShoppingPassword(response.data));
    }

    useEffect(
        () => getShoppingPassword(username), [username]
    );

    const updateCustomerWallet = (username, totalAmount) => {
        updateCustomerWalletApi(username, totalAmount)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    };

    /*
    useEffect(
        () => updateCustomerWallet(username, totalCartAmount), [username, totalCartAmount]
    );
    */

    const passwordChangeHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setEnteredPassword(event.target.value);
    }

    const passwordControlHandler = () => {
        if (enteredPassword.length !== 0 && enteredPassword === shoppingPassword) {
            setPasswordEntered(true);
            if (totalCartAmount < customerWallet) {
                setWalletEnough(true);
                updateCustomerWallet(username, totalCartAmount);
            }
            else {
                setWalletEnough(false);
            }
        }
        else {
            setPasswordEntered(false);
        }
    }

    // Buraya kullanıcının bütçesi yeterli ise başarılı alışveriş koyulacak, değilse error atacak bütçeniz yeterli değil diye
    /*
    function checkoutHandler() {
        retrieveCustomerWalletApi("anlcmlysr")
        .then(response => {
            console.log(response.data);
            if(getTotalAmount() < response.data) {
                console.log(response.data - getTotalAmount());
            }
            updateCustomerWalletApi("anlcmlysr", "WACrGHX1QE", getTotalAmount())
            .then(response => console.log(response))
            .catch(error => console.log(error));
        })
    }
    */

    return (
        <div className="checkout">
            <p> Subtotal: ${totalCartAmount}</p>
            {isPasswordEntered && isWalletEnough ? <p>Password is correct and Payment is done</p> : 
            <div>
                <label>Shopping Password</label>
                <input
                type='password'
                name='password'
                placeholder="Enter your private shopping password..."
                onChange={(event) => passwordChangeHandler(event)}
                />
            </div>
            }
            <button onClick={passwordControlHandler}> Checkout </button>
        </div>
    )
}

export default Payment;