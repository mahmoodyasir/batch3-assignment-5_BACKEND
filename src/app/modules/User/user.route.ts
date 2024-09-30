import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';


const router = express.Router();

router.post('/signup',
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.userSignUp);


router.post('/login',
    validateRequest(UserValidation.loginDataValidationSchema),
    UserControllers.userLogin);

router.post('/update',
    validateRequest(UserValidation.userUpdateValidationSchema),
    UserControllers.updateUser);

router.get('/getAllUser',
    auth(USER_ROLE.admin),
    UserControllers.getAllUser);

router.get('/fetchUser',
    UserControllers.getUser);


export const UserRoutes = router;