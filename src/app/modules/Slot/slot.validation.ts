import { z } from 'zod';


const timeStringSchema = z.string().refine(
    (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; //HH:MM
        return regex.test(time);
    },
    {
        message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
);


const dateStringSchema = z.string().refine(
    (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
        return regex.test(date);
    },
    {
        message: 'Invalid date format, expected "YYYY-MM-DD"',
    },
);

const slotValidationSchema = z.object({
    body: z.object({
        service: z.string(),
        date: dateStringSchema,
        startTime: timeStringSchema,
        endTime: timeStringSchema,
        isBooked: z.enum(['available', 'booked', 'canceled']).optional(),
    })
});



export const SlotValidation = {
    slotValidationSchema,
}