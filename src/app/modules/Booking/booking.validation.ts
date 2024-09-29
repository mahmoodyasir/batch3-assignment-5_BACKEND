import { z } from 'zod';

const dateStringSchema = z.number().refine(
    (date) => {
        const regex = /^\d{4}$/; // YYYY
        return regex.test(String(date));
    },
    {
        message: 'Invalid date format, expected "YYYY"',
    },
);


const bookingValidationSchema = z.object({
    body: z.object({
        
        serviceId: z.string(),
        slotId: z.string(),
        vehicleType: z.enum(['car', 'truck', 'SUV', 'van', 'motorcycle', 'bus',
            'electricVehicle', 'hybridVehicle', 'bicycle', 'tractor']),
        vehicleBrand: z.string(),
        vehicleModel: z.string(),
        manufacturingYear: dateStringSchema,
        registrationPlate: z.string(),
    })
});


export const BookingValidation = {
    bookingValidationSchema,
}