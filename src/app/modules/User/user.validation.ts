import { z } from 'zod';

const userValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string({
            invalid_type_error: 'Password must be string',
        }),
        phone: z.string(),
        role: z.enum(['admin', 'user']),
        address: z.string(),
    })
})

const loginDataValidationSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    })
})


export const UserValidation = {
    userValidationSchema,
    loginDataValidationSchema,
}