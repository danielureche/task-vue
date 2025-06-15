import ApiClient from '@/config/axios'
import { API_ROUTES } from '@/constants/routes'
import { handleError } from '@/utils/handleError'

/**
 * TaskService provides methods to perform CRUD operations on tasks by communicating
 * with the backend API. It handles API requests, responses, and error formatting.
 */
class TaskService {
    /**
     * Retrieves all tasks from the server.
     *
     * Sends a GET request to fetch the full list of tasks.
     *
     * @returns {Promise<Array<Object>>} - A list of task objects.
     * @throws {Object} - Throws a structured error object if the request fails.
     */
    async getAllTasks() {
        try {
            const res = await ApiClient.get(API_ROUTES.TASKS.GET_ALL)
            return res.data.data
        } catch (error) {
            throw handleError(error)
        }
    }

    /**
     * Retrieves a specific task by its unique identifier.
     *
     * Sends a GET request to fetch the details of a single task.
     *
     * @param {string|number} id - The unique identifier of the task.
     * @returns {Promise<Object>} - The task object corresponding to the given ID.
     * @throws {Object} - Throws a structured error object if the request fails.
     */
    async getTaskById(id) {
        try {
            const res = await ApiClient.get(API_ROUTES.TASKS.UPDATE(id))
            return res.data.data
        } catch (error) {
            throw handleError(error)
        }
    }

    /**
     * Creates a new task with the given data.
     *
     * Sends a POST request to create a new task.
     *
     * @param {Object} taskData - The data of the task to be created.
     * @returns {Promise<Object>} - The newly created task object.
     * @throws {Object} - Throws a structured error object if the request fails.
     */
    async createTask(taskData) {
        try {
            const res = await ApiClient.post(API_ROUTES.TASKS.CREATE, taskData)
            return res.data.data
        } catch (error) {
            throw handleError(error)
        }
    }

    /**
     * Updates an existing task by its ID with new data.
     *
     * Sends a PUT request to update the task information.
     *
     * @param {string|number} id - The ID of the task to update.
     * @param {Object} taskData - The updated task data.
     * @returns {Promise<Object>} - The updated task object.
     * @throws {Object} - Throws a structured error object if the request fails.
     */
    async updateTask(id, taskData) {
        try {
            const res = await ApiClient.put(API_ROUTES.TASKS.UPDATE(id), taskData)
            return res.data.data
        } catch (error) {
            throw handleError(error)
        }
    }

    /**
     * Deletes a task by its ID.
     *
     * Sends a DELETE request to remove the task from the server.
     *
     * @param {string|number} id - The ID of the task to delete.
     * @returns {Promise<boolean>} - Returns true if deletion was successful.
     * @throws {Object} - Throws a structured error object if the request fails.
     */
    async deleteTask(id) {
        try {
            await ApiClient.delete(API_ROUTES.TASKS.DELETE(id))
            return true
        } catch (error) {
            throw handleError(error)
        }
    }

}

export default new TaskService()
