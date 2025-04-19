import express from 'express';
import usersRouter from './users.js';
import requestsRouter from './requests.js';
import sessionsRouter from './sessions.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/requests', requestsRouter);
router.use('/sessions', sessionsRouter);

export default router;
