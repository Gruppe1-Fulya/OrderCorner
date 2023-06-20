import React, { useState, useEffect } from 'react'
import { retrieveProductsByCategoryApi } from '../../api/ProductApiService';
import CategoryProduct from './CategoryProduct';

const CategoriesItem = ({category}) => {

    const [ products, setProducts ] = useState([]);

    const retrieveProductsByCategory = (category) => {
        retrieveProductsByCategoryApi(category)
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))
    }

    useEffect (
        () => retrieveProductsByCategory(category), [retrieveProductsByCategory(category)]
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

export default CategoriesItem;
