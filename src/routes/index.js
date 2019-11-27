import express from 'express';
import auth from './Auth';
import profile from './Profile';
import session from './Session';

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/session', session);

export default router;
