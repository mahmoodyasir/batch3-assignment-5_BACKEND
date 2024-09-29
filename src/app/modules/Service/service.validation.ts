import { z } from 'zod';

const serviceValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        duration: z.number(),
        isDeleted: z.boolean(),
    })
});

const serviceUpdateValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        duration: z.number().optional(),
        isDeleted: z.boolean().optional(),
    })
});


export const ServiceValidation = {
    serviceValidationSchema,
    serviceUpdateValidationSchema,
}