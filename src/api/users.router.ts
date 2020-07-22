import express from 'express';

import Service from '../services/users.service';

const router = express.Router();

router.get('/:userId', (req, res) => {
  return Service.getById(req?.params?.userId)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send(err?.message || 'Error'));
});

router.post('/', (req, res) => {
  return Service.create(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).send(err?.message || 'Error'));
});

router.delete('/:userId', (req, res) => {
  return Service.delete(req?.params?.userId)
    .then(data => res.status(204).json(data))
    .catch(err => res.status(400).send(err?.message || 'Error'));
});

router.put('/:userId', (req, res) => {
  return Service.update(req?.params?.userId, req?.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send(err?.message || 'Error'));
});

export default router;
