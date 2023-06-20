import React, { createContext, useState, useEffect } from 'react'
import { retrieveProductApi, retrieveAllProductsApi, addProductToCartApi, removeProductFromCartApi} from '../api/ProductApiService';
import { useParams } from 'react-router-dom';

export const ProductContext = createContext(null);

export const ProductContextProvider = (props) => {

    const products = [];
    const {username} = "anlcmlysr"

    const {id} = useParams()
    const[productName, setProductName] = useState('')
    const[price, setPrice] = useState(null)
    const[cartAmount, setCartAmount] = useState(null)

    function retrieveProducts(){
        retrieveAllProductsApi()
        .then(response => {
            setProductName(response.data.productName)
            setPrice(response.data.price)
            setCartAmount(response.data.cartAmount)
            let newProduct = {"id":Number(id), "productName": response.data.productName, "price": response.data.price, "cartAmount": response.data.cartAmount};
            products.push(newProduct);
        })
        .catch(error => console.log(error.response.data))
    }


    function retrieveProduct(){
        retrieveProductApi(Number(id))
        .then(response => {
            console.log(response)
            setProductName(response.data.productName)
            setPrice(response.data.price)
            setCartAmount(response.data.cartAmount)
        })
        .catch(error => console.log(error))
    }

    /*
    useEffect (
        () => retrieveProduct()
    )
    */

    function addProductToCart(){
        addProductToCartApi(Number(id))
        .then(() => {
            setCartAmount(cartAmount + 1)
        })
        .catch(error => console.log(error))
    }

    function removeFromCart(){
        removeProductFromCartApi(Number(id))
        .then(response => {
            setCartAmount(cartAmount - 1)
        })
        .catch(error => console.log(error))
    }

    const contextValue = {username, productName, price, cartAmount,products, retrieveProduct, addProductToCart, removeFromCart, retrieveProducts}

    return (
        <ProductContext.Provider value={contextValue}>
            <>{() => retrieveProducts()}</>
            {props.children}
        </ProductContext.Provider>
    )


}