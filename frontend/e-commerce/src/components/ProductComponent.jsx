import { useEffect, useState } from "react";
import { addProductToCartApi, removeProductFromCartApi, retrieveAllProductsApi, retrieveProductApi } from "../api/ProductApiService";
import { updateLastCheckedProductApi } from "../api/CustomerApiService";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../products";
import '../pages/review/review-item.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faCartArrowDown} from '@fortawesome/free-solid-svg-icons'

export default function ProductComponent() { 

    /*
    const {id} = useParams()
    const {productName, price, cartAmount,products, retrieveProduct, addProductToCart, removeFromCart, retrieveProducts} = useContext(ProductComponent);
    */
    const username = "anlcmlysr";
    const {id} = useParams()
    const[productName, setProductName] = useState('')
    const[price, setPrice] = useState(null)
    const[cartAmount, setCartAmount] = useState(null)
    const [ stock, setStock ] = useState(null);
    const[product, setProduct] = useState(null)


    function retrieveProducts(){
        retrieveAllProductsApi()
        .then(response => {
            setProductName(response.data.productName)
            setPrice(response.data.price)
            setCartAmount(response.data.cartAmount);
            setStock(response.data.stock);
        })
        .catch(error => console.log(error.response.data))
    }


    useEffect (
        () => retrieveProduct(), []
    )

    function retrieveProduct(){
        retrieveProductApi(Number(id))
        .then(response => {
            console.log(response)
            setProduct(response.data)
            setProductName(response.data.productName)
            setPrice(response.data.price)
            setCartAmount(response.data.cartAmount)
            setStock(response.data.stock);
        })
        .catch(error => console.log(error))
    }

    function updateLastCheckedProduct() {
        updateLastCheckedProductApi(username, Number(id))
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
    }

    useEffect (
        () => updateLastCheckedProduct(), []
    )

    /*
    useEffect(() => {
        const updateLastCheckedProduct = async () => {
            try {
                const response = await updateLastCheckedProductApi(username, Number(id));
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        updateLastCheckedProduct();
    }, [])
    */

    /*
    function updateLastCheckedProduct() {
        updateLastCheckedProductApi(username, Number(id))
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
    }
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

    /*
    function updateLastCheckedProduct(){
        updateLastCheckedProductApi("anlcmlysr", productName)
        .then(response => {
                console.log(response)
        })
        .catch(error => console.log(error))
    }
    */

    let productInfo = PRODUCTS.find((product) => product.id === Number(id))

    return (
        <div className="product">
            <img src={productInfo.productImage}/>
            <div className="description">
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

}