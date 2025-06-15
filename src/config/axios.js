/**
 * Axios instance configured for making HTTP requests to the backend API.
 *
 * Features:
 * - Automatically adds the Bearer token from localStorage to request headers.
 * - Handles 401 Unauthorized responses by clearing auth data and redirecting to the login page.
 * - Sets default base URL and headers for all API calls.
 *
 * @module ApiClient
 */

import axios from 'axios'
import router from '@/router'


// Create an axios instance with default settings
const ApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

/**
 * Request Interceptor
 *
 * Automatically attaches the authentication token to the Authorization header
 * if it exists in localStorage.
 */
ApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * Response Interceptor
 *
 * Handles 401 Unauthorized responses by:
 * - Clearing authentication data from localStorage
 * - Redirecting the user to the login page (if not already there)
 */
ApiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const status = error.response?.status

        if (status === 401) {
            localStorage.removeItem('authToken')
            localStorage.removeItem('authUser')

            if (router.currentRoute.value.path !== '/login') {
                router.push('/login')
            }
        }

        return Promise.reject(error)
    }
)

export default ApiClient
