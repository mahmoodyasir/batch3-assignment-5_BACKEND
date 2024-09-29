import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { ServiceValidation } from './service.validation';
import { ServiceControllers } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { SlotValidation } from '../Slot/slot.validation';
import { SlotControllers } from '../Slot/slot.controller';

const router = express.Router();

router.post('/',
    auth(USER_ROLE.admin),
    validateRequest(ServiceValidation.serviceValidationSchema),
    ServiceControllers.createService);

router.get('/:id', ServiceControllers.getSingleService);

router.post('/all', ServiceControllers.getAllService);

router.put('/:id',
    auth(USER_ROLE.admin),
    validateRequest(ServiceValidation.serviceUpdateValidationSchema),
    ServiceControllers.updateService);

router.delete('/:id',
    auth(USER_ROLE.admin),
    ServiceControllers.deleteService);

router.post('/slots',
    auth(USER_ROLE.admin),
    validateRequest(SlotValidation.slotValidationSchema),
    SlotControllers.createSlots);



export const ServiceRoutes = router;