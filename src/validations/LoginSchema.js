import { z } from 'zod'

/**
 * Returns a Zod validation schema for the login form with i18n support.
 *
 * This schema enforces:
 * - Required and properly formatted email.
 * - Required password with a minimum length of 6 characters.
 * - Optional "remember me" boolean flag.
 *
 * The schema uses a translation function `t` to provide localized validation messages.
 *
 * @param {(key: string) => string} t - Translation function (e.g., from vue-i18n) to localize error messages.
 * @returns {ZodObject} - Zod schema object for validating login form input.
 *
 * @example
 * const schema = loginSchema(t)
 * const result = schema.safeParse({ email: '...', password: '...' })
 */
export const loginSchema = (t) => z.object({
    email: z.string()
        .min(1, t('auth.login.form.email.validations.required'))
        .email(t('auth.login.form.email.validations.invalid')),

    password: z.string()
        .min(1, t('auth.login.form.password.validations.required'))
        .min(6, t('auth.login.form.password.validations.min_length')),

    remember: z.boolean().optional()
})