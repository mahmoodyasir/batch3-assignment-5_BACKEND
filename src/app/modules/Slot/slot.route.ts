import express from 'express';
import { SlotControllers } from './slot.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();


router.get('/availability', SlotControllers.getAvailableSlots);

router.put('/update_status/:id', auth(USER_ROLE.admin), SlotControllers.updateSlotStatus);


export const SlotRoutes = router;