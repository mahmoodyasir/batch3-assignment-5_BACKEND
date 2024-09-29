import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { ServiceRoutes } from '../modules/Service/service.route';
import { SlotRoutes } from '../modules/Slot/slot.route';
import { BookingRoutes, myBookingsRouter } from '../modules/Booking/booking.route';


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes
    },
    {
        path: '/services',
        route: ServiceRoutes
    },
    {
        path: '/slots',
        route: SlotRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
    {
        path: '/my-bookings',
        route: myBookingsRouter
    }
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;