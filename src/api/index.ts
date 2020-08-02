import express from 'express';

import metricsRouter from './metrics.router';
import userRouter from './users.router';

const router = express.Router();

router.get('/', (_req, res) => res.send(200));

router.use('/metrics', metricsRouter);
router.use('/users', userRouter);

export default router;
