import express from 'express';
import request from '../controller/RequestSession';
import verify from '../middleware/verify';

const router = express.Router();

router.get('/request', verify, request);

export default router;
