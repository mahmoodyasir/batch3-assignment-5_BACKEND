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

const userUpdateValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        role: z.enum(['admin', 'user']).optional(),
        address: z.string().optional(),
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
    userUpdateValidationSchema,
}