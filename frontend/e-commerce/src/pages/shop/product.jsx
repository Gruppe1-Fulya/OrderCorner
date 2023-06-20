import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context';
import { useNavigate } from 'react-router-dom';

export const Product = (props) => {

    const { id, productName, price, productImage} = props.data;
    const { addToCart, cartItems, removeFromCart} = useContext(ShopContext);
    const cartItemAmount = cartItems[id];

    const navigate = useNavigate();

    
    
    return (
        <div className='product'>
            <img src={productImage} onClick={() => navigate(`/products/${id}`)}/>
            <div className='description'>
                <p>
                    <b>{productName}</b>
                </p>
                <p>
                    ${price}
                </p>
                <button className='addToCartBttn' onClick={() => addToCart(id)}>
                    Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
                </button>
                <button className='removeFromCartBttn' onClick={() => removeFromCart(id)}>
                    Remove From Cart {cartItemAmount > 1 && <> ({cartItemAmount}) </>}
                </button>
            </div>
        </div>
    )
};