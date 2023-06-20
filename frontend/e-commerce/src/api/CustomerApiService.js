import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retrieveLastCheckedProductApi = 
    (username) => apiClient.get(`/${username}/last-checked-product`)

export const updateLastCheckedProductApi = 
    (username, productId) => apiClient.put(`/${username}/last-checked/${productId}`)

export const retrieveProductsInCartApi = 
    (username) => apiClient.get(`${username}/cart`)

export const retrieveCustomerWalletApi = 
    (username) => apiClient.get(`/${username}/wallet`)

export const updateCustomerWalletApi = 
    (username, totalCartAmount) => apiClient.put(`/${username}/update-wallet/${totalCartAmount}`)

export const retrieveCustomerInfosApi = 
    (username) => apiClient.get(`/${username}/profile`)

export const updateCustomerInfosApi = 
    (username, name, lastName, phoneNumber, wallet) => apiClient.put(`/${username}/update-profile/${name}/${lastName}/${phoneNumber}/${wallet}`)

export const retrieveAllUsernamesApi = 
    () => apiClient.get(`/usernames`)

export const retrieveAllPasswordsApi = 
    () => apiClient.get(`/passwords`)

export const retrieveTotalCartAmountApi = 
    (username) => apiClient.get(`/${username}/totalAmount`)

export const getShoppingPasswordApi = 
    (username) => apiClient.get(`/${username}/shopping-password`)




