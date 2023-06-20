import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../products';
import { addProductToCartApi, removeProductFromCartApi } from '../../api/ProductApiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faCartArrowDown} from '@fortawesome/free-solid-svg-icons'

const CategoryProduct = (props) => {

    const { id, productName, price, stock } = props.data;
    const [ cartAmount, setCartAmount ] = useState(props.data.cartAmount);

    function addProductToCart(){
        addProductToCartApi(Number(id))
        .then(() => {
            setCartAmount(cartAmount + 1);
        })
        .catch(error => console.log(error))
    }

    function removeFromCart(){
        removeProductFromCartApi(Number(id))
        .then(response => {
            setCartAmount(cartAmount -1);
        })
        .catch(error => console.log(error))
    }

    const navigate = useNavigate();

    let productInfo = PRODUCTS.find((product) => product.id === Number(id))
    
    return (
        <div className='product'>
            <img src={productInfo.productImage} onClick={() => navigate(`/products/${id}`)}/>
            <div className='description'>
                <p>
                    <b>{productName}</b>
                </p>
                <p>
                    ${price}
                </p>
                {stock > cartAmount ?
                    <button className='addToCartBttn' onClick={() => addProductToCart(id)}>
                        Add to Cart {cartAmount > 0 && <><FontAwesomeIcon icon={faCartPlus} className="icons"/> ({cartAmount})</>}
                    </button>
                : <></>
                }
                {cartAmount > 0 ? 
                <button className='removeFromCartBttn' onClick={() => removeFromCart(id)}>
                    Remove From Cart {cartAmount > 0 && <><FontAwesomeIcon icon={faCartArrowDown} className="icons"/> ({cartAmount}) </>}
                </button>
                : <></> }
            </div>
        </div>
    )
};

export default CategoryProduct;