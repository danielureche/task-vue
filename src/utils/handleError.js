/**
 * Handles and normalizes API errors into a consistent object format.
 *
 * Distinguishes between server-side errors, network errors, and other exceptions.
 *
 * @param {any} error - The error thrown during an API request.
 * @returns {{message: string, status: number, data: any}} - Structured error information.
 */
export function handleError(error) {
    if (error.response) {
        return {
            message: error.response.data?.message || 'Unexpected error.',
            status: error.response.status,
            data: error.response.data,
        }
    } else if (error.request) {
        return {
            message: 'Connection error. Please check your internet connection.',
            status: 0,
            data: null,
        }
    } else {
        return {
            message: error.message || 'Unknown error occurred.',
            status: -1,
            data: null,
        }
    }
}
