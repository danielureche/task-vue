import { z } from 'zod'

/**
 * Returns a Zod validation schema for the user registration form with i18n support.
 *
 * This schema enforces:
 * - Required name field.
 * - Required and properly formatted email.
 * - Required password with a minimum of 6 characters.
 * - Required confirmPassword field that must match the password.
 * - Required acceptance of terms and conditions.
 *
 * The validation error messages are dynamically translated using the provided `t` function.
 *
 * @param {(key: string) => string} t - Translation function (e.g., from vue-i18n) to localize validation messages.
 * @returns {ZodObject} - Zod schema object for validating registration form input.
 *
 * @example
 * const schema = registerSchema(t)
 * const result = schema.safeParse({ name: '...', email: '...', password: '...', confirmPassword: '...', acceptTerms: true })
 */
export const registerSchema = (t) => z
    .object({
        name: z
            .string()
            .min(1, t('auth.register.form.name.validations.required')),

        email: z
            .string()
            .min(1, t('auth.register.form.email.validations.required'))
            .email(t('auth.register.form.email.validations.invalid')),

        password: z
            .string()
            .min(1, t('auth.register.form.password.validations.required'))
            .min(6, t('auth.register.form.password.validations.min_length')),

        confirmPassword: z
            .string()
            .min(1, t('auth.register.form.confirm_password.validations.required')),

        acceptTerms: z.literal(true, {
            errorMap: () => ({
                message: t('auth.register.form.terms.validations.required'),
            }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: t('auth.register.form.confirm_password.validations.mismatch'),
    });
