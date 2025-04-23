//combines all route modules
import express from 'express';
import usersRouter from './users.js';
import requestsRouter from './requests.js';
import sessionsRouter from './sessions.js';
import userRoutes from './users.js';
import matchRoutes from './match.js';


const router = express.Router();

router.use('/users', usersRouter);
router.use('/requests', requestsRouter);
router.use('/sessions', sessionsRouter);
router.use('/users', userRoutes);
router.use('/match', matchRoutes);


export default router;
