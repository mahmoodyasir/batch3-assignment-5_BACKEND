import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequests';
import { BookingControllers } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();
const secondRouter = express.Router();

router.post('/',
    auth(USER_ROLE.user),
    validateRequest(BookingValidation.bookingValidationSchema),
    BookingControllers.createServiceBooking);

router.get('/',
    auth(USER_ROLE.admin),
    BookingControllers.getAllServiceBooking);

secondRouter.get('/',
    auth(USER_ROLE.user),
    BookingControllers.getPersonalServiceBooking);


export const BookingRoutes = router;
export const myBookingsRouter = secondRouter;