import React, { useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom'
import { retrieveLastCheckedProductApi } from '../api/CustomerApiService'
import { addProductToCartApi, removeProductFromCartApi } from '../api/ProductApiService';
import { PRODUCTS } from '../products';
import '../pages/review/review-item.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faCartArrowDown} from '@fortawesome/free-solid-svg-icons'

export default function LastCheckedProductComponent() {

    const {username} = useParams();
    const [product, setProduct] = useState([]);
    const[productName, setProductName] = useState('')
    const[price, setPrice] = useState(null)
    const[cartAmount, setCartAmount] = useState(null)
    const [id, setId] = useState(null);
    const [ productImage, setProductImage ] = useState(null);


    function retrieveLastCheckedProduct() {
        retrieveLastCheckedProductApi(username)
        .then(response => {
            setProduct(response.data)
            setId(response.data.id);
            setProductName(response.data.productName);
            setPrice(response.data.price);
            setCartAmount(response.data.cartAmount);
            setProductImage(PRODUCTS.find((product) => product.id === Number(id)).productImage);
        })
        .catch(err => console.log(err));
    };

    useEffect (
        () => retrieveLastCheckedProduct(), []
    )

    function addProductToCart(){
        addProductToCartApi(id)
        .then(() => {
            setCartAmount(cartAmount + 1)
        })
        .catch(error => console.log(error))
    }

    function removeFromCart(){
        removeProductFromCartApi(id)
        .then(response => {
            setCartAmount(cartAmount - 1)
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="product">
            <img src={productImage} />
            <div className="description">
                <p>
                    <b>{productName}</b>
                </p>
                <p>
                    ${price}
                </p>
                <button className='addToCartBttn' onClick={() => addProductToCart()}>
                    Add to Cart {cartAmount > 0 && <><FontAwesomeIcon icon={faCartPlus} className="icons"/> ({cartAmount})</>}
                </button>
                {cartAmount > 0 ? 
                <button className='removeFromCartBttn' onClick={() => removeFromCart(id)}>
                    Remove From Cart {cartAmount > 0 && <><FontAwesomeIcon icon={faCartArrowDown} className="icons"/> ({cartAmount}) </>}
                </button>
                : <></> }
            </div>
        </div>
    )
}

