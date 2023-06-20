import React, { useState , useEffect } from 'react';
import { addProductToCartApi, removeProductFromCartApi, updateCartAmountApi } from '../../api/ProductApiService';
import { PRODUCTS } from '../../products';
import './cart.css';

const CartItem = (props) => {

    const { id, productName, price, stock } = props.data;
    const [ cartAmount, setCartAmount ] = useState(props.data.cartAmount);
    const [ totalCartAmount, setTotalCartAmount ] = useState(0);

    /*
    function retrieveProductsInCart() {
        retrieveProductsInCartApi("username")
        .then((response) => {
            setCartProducts(response.data);
            console.log(response.data);
        })
        .catch(error => console.log(error))
    }

    useEffect (
        () => retrieveProductsInCart(), [retrieveProductsInCart]
    )
    */

    function addProductToCart(){
        addProductToCartApi(id)
        .then(() => {
            setCartAmount(cartAmount+1);
        })
        .catch(error => console.log(error))
    }

    function removeFromCart(){
        removeProductFromCartApi(id)
        .then(response => {
            setCartAmount(cartAmount-1);
        })
        .catch(error => console.log(error));
    }

    const updateCartItem = (newCartAmount, id) => {
        setCartAmount(newCartAmount);
        console.log(newCartAmount);
        updateCartAmountApi(id, newCartAmount)
        .then(response => console.log(response));
    }


    let productInfo = PRODUCTS.find((product) => product.id === Number(id))

    return (
        <div className='cartItem'>
            <img src={productInfo.productImage} />
            <div className='description'>
                <p>
                    <b>{productName}</b>
                </p>
                <p>
                    ${price}
                </p>
                <p>
                    {cartAmount}
                </p>
                <div className='countHandler'>
                    <button onClick={() => removeFromCart()}>-</button>
                    <input value={cartAmount} onChange={(e) => updateCartItem(Number(e.target.value), id)}></input>
                    <button onClick={() => addProductToCart()}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;

/*
<input value={cartItems[id]} onChange={(e) => updateCartItem(Number(e.target.value), id)}></input>
*/