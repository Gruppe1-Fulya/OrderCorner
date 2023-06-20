import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const signup = (user) => {
    return apiClient.post('/api/1.0/users', user);
};