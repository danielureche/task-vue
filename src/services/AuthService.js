import ApiClient from '@/config/axios'
import { API_ROUTES } from '@/constants/routes'
import { handleError } from '@/utils/handleError'

/**
 * AuthService handles authentication-related operations such as login, registration, 
 * and logout by communicating with the backend API. It also manages the local storage 
 * of authentication tokens and user data.
 */
class AuthService {
    /**
     * Authenticates a user using provided credentials.
     *
     * Sends a POST request to the login endpoint with the user's email and password.
     * On successful authentication, it stores the token and user data in local storage.
     *
     * @param {{email: string, password: string}} credentials - User login credentials.
     * @returns {Promise<{user: Object, token: string}>} - Authenticated user data and JWT token.
     * @throws {Object} - Throws a structured error object if the request fails.
     */
    async login(credentials) {
        try {
            const res = await ApiClient.post(API_ROUTES.AUTH.LOGIN, credentials)
            const data = res.data.data
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('authUser', JSON.stringify(data.user))
            return data
        } catch (error) {
            throw handleError(error)
        }
    }

    /**
     * Registers a new user with the provided information.
     *
     * Sends a POST request to the registration endpoint. On success, it stores
     * the returned authentication token and user data in local storage.
     *
     * @param {{name: string, email: string, password: string, password_confirmation: string}} userData - New user registration details.
     * @returns {Promise<{user: Object, token: string}>} - Registered user data and JWT token.
     * @throws {Object} - Throws a structured error object if the request fails.
     */
    async register(userData) {
        try {
            const res = await ApiClient.post(API_ROUTES.AUTH.REGISTER, userData)
            const data = res.data.data
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('authUser', JSON.stringify(data.user))
            return data
        } catch (error) {
            throw handleError(error)
        }
    }

    /**
     * Logs out the current authenticated user.
     *
     * Sends a POST request to the logout endpoint. Regardless of the API response,
     * the method clears the local storage to remove authentication data.
     *
     * @returns {Promise<void>}
     */
    async logout() {
        try {
            await ApiClient.post(API_ROUTES.AUTH.LOGOUT)
        } finally {
            localStorage.removeItem('authToken')
            localStorage.removeItem('authUser')
        }
    }
}

export default new AuthService()
