import express from 'express';

import metricsRouter from './metrics.router';
import userRouter from './users.router';
import notificationRouter from './notification.router';

const router = express.Router();

router.get('/', (_req, res) => res.send(200));

router.use('/metrics', metricsRouter);
router.use('/users', userRouter);
router.use('/notification', notificationRouter);

export default router;
