import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retrieveAllProductsApi = 
    () => apiClient.get('/products')

export const retrieveProductApi = 
    (id) => apiClient.get(`/products/${id}`)

export const addProductToCartApi = 
    (id) => apiClient.put(`/products/${id}`)

export const removeProductFromCartApi = 
    (id) => apiClient.put(`/products/${id}/remove`)

/*
export const updateLastCheckedProductApi = 
    (username, productId) => apiClient.post(`/users/${username}/products/update-products/${productId}`)
*/

export const updateCartAmountApi = 
    (id, newCartAmount) => apiClient.put(`/products/${id}/update-cartAmount/${newCartAmount}`) 

export const retrieveProductsByCategoryApi = 
    (category) => apiClient.get(`/${category}/products`)
