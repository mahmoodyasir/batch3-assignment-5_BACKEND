import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';


const router = express.Router();

router.post('/signup',
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.userSignUp);


router.post('/login',
    validateRequest(UserValidation.loginDataValidationSchema),
    UserControllers.userLogin);

router.get('/fetchUser',
    UserControllers.getUser);


export const UserRoutes = router;