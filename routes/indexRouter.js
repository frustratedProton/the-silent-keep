import { Router } from 'express';
import authRouter from './authRouter.js';
import messageRouter from './messageRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/', messageRouter);

export default router;
