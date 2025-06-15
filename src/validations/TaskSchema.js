import { z } from 'zod'

/**
 * Returns a Zod validation schema for the task creation/editing form with i18n support.
 *
 * This schema enforces:
 * - Required title (non-empty string, trimmed).
 * - Optional description field.
 * - Required status value constrained to a valid enum: 'pending', 'in_progress', or 'completed'.
 *
 * The validation error messages are dynamically translated using the provided `t` function.
 *
 * @param {(key: string) => string} t - Translation function (e.g., from vue-i18n) to localize validation messages.
 * @returns {ZodObject} - Zod schema for validating task form input.
 *
 * @example
 * const schema = taskSchema(t)
 * const result = schema.safeParse({ title: 'My task', status: 'pending' })
 */
export const taskSchema = (t) => z.object({
    title: z
        .string()
        .min(1, t('task_modal.form.title.validations.required'))
        .trim(),

    description: z
        .string()
        .optional(),

    status: z.enum(['pending', 'in_progress', 'completed'], {
        errorMap: () => ({ message: t('task_modal.form.status.validations.required') })
    })
})