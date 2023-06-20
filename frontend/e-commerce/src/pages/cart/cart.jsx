import CartItem from './cart-item';
import './cart.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { retrieveAllProductsApi } from "../../api/ProductApiService";
import { retrieveProductsInCartApi } from '../../api/CustomerApiService';
import CategoryProduct from '../categories/CategoryProduct';


export default function Cart() {
    
    // const { products } = useContext(ProductContext)
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    
    function retrieveProductsInCart(){
        retrieveProductsInCartApi("anlcmlysr")
        .then(response => {
            setProducts(response.data);
            console.log(response.data);
        })
        .catch(error => console.log(error))
    }

    useEffect (
        () => retrieveProductsInCart(), []
    )



    /*
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
    */



    return (
        <div className="cart">
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className="cartItems">
                {products.map( product => (
                    <CartItem data={product} />
                ))}
            </div>
            <div className="checkout">
                <button onClick={() => navigate("/")}> Continue Shopping</button>
                <button onClick={() => navigate(`/anlcmlysr/totalCartAmount`)}> Checkout </button>
            </div>
        </div>
    )
}

// data={[product]}
// return <CartItem/>