export const API_ROUTES = {
    TASKS: {
        CREATE: '/api/task',
        GET_ALL: '/api/task',
        UPDATE: (id) => `/api/task/${id}`,
        DELETE: (id) => `/api/task/${id}`
    },
    AUTH: {
        LOGIN: '/api/login',
        REGISTER: '/api/register',
        LOGOUT: '/api/logout'
    }
}