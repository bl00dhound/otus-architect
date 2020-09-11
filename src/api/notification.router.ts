import express from 'express';

import checkXUserId from '../middlewares/checkXUserId';
import Service from '../services/notification.service';

const router = express.Router();

router.get(
  '/:userId',
  checkXUserId,
  (req, res) => Service.getNotificationsByUserId(req.params.userId)
    .then((notifications) => res.status(200).json(notifications))
    .catch((err) => res.status(400).send(err?.message || 'Error')),
);

export default router;
