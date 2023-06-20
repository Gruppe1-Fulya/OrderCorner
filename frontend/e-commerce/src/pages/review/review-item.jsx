import React from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCTS } from '../../products'
import { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'
import './review-item.css'

export default function ReviewItem() {

    const {id} = useParams()

    let productInfo = PRODUCTS.find((product) => product.id === Number(id))

    const { addToCart, cartItems, removeFromCart} = useContext(ShopContext);
    const cartItemAmount = cartItems[id];

    
    return (
        <div className='product'>
            <img src={productInfo.productImage} />
            <div className='description'>
                <p>
                    <b>{productInfo.productName}</b>
                </p>
                <p>
                    ${productInfo.price}
                </p>
                <button className='addToCartBttn' onClick={() => addToCart(id)}>
                    Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
                </button>
                <button className='removeFromCartBttn' onClick={() => removeFromCart(id)}>
                    Remove From Cart {cartItemAmount > 1 && <> ({cartItemAmount}) </>}
                </button>
            </div>
            <div className='features'>
                
            </div>
        </div>
    )
}
