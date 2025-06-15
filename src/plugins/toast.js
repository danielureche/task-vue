/**
 * Notification utilities using vue-sonner to show consistent toast messages
 * across the application. Each method displays a styled toast with custom
 * background and text color, depending on the notification type.
 *
 * @module NotificationService
 */

import { toast } from 'vue-sonner'

/**
 * Displays a success toast notification.
 *
 * Typically used after successful operations such as creating, updating, or deleting records.
 *
 * @param {string} message - The message to display in the toast.
 *
 * @example
 * showSuccess('Task created successfully')
 */
export const showSuccess = (message) =>
    toast.success(message, {
        className: 'toast-success',
        style: {
            background: '#dcfce8',
            border: 'none',
            color: '#166534'
        }
    })

export const showError = (message) =>
    toast.error(message, {
        className: 'toast-success',
        style: {
            background: '#fee2e2',
            border: 'none',
            color: '#dc2626'
        }
    })

export const showInfo = (message) =>
    toast.info(message, {
        className: 'toast-info',
        style: {
            background: '#dbe4fe',
            border: 'none',
            color: '#1d4ed8'
        }
    })