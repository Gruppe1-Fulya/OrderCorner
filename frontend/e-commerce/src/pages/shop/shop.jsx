import './shop.css'
import { retrieveAllProductsApi } from "../../api/ProductApiService"
import { useState, useEffect } from "react"
import CategoryProduct from "../categories/CategoryProduct"

export default function Shop() { 

    const [ products, setProducts ] = useState([]);

    const retrieveProducts = () => {
        retrieveAllProductsApi()
        .then(response => {
            console.log(response.data)
            setProducts(response.data);
        })
        .catch(error => console.log(error.response.data))
    };

    useEffect (
        () => retrieveProducts(), []
    )

    return (
        <div className="Shop">
            <div className="Products">
                {products.map((product) => (
                <CategoryProduct data={product}/>
                ))}
            </div>
        </div>
    )
}