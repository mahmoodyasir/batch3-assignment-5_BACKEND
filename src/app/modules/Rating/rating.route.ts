import express from 'express';
import { RatingControllers } from './rating.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';


const router = express.Router();

router.post('/create-rating', auth(USER_ROLE.user), RatingControllers.createRating);

router.get('/get-rating', auth(USER_ROLE.user), RatingControllers.getAllRating);



export const RatingRoutes = router;