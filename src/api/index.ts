import express from 'express';

import healthRouter from './health.router';
import userRouter from './users.router';

const router = express.Router();

router.get('/', (_req, res) => res.send(200));

router.use('/health', healthRouter);
router.use('/users', userRouter);

export default router;
