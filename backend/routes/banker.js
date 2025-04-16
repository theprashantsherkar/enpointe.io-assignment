import express from 'express';
import { getAccountsAPI, getUsersAPI } from '../controllers/bankerCont.js';

const router = express.Router();

router.get('/getUsers', getUsersAPI);
router.get('/getAccounts', getAccountsAPI);

export default router;
