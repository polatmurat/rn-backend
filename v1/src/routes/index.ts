import express from 'express';
const router = express.Router();
import auth from './auth/index';

router.use('/auth', auth);

export default router;