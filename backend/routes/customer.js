import express from 'express'
import { depositAPI, getBalanceAPI, withdrawAPI } from '../controllers/customerCont.js'
import { isAuthenticated } from '../utils/isAuthenticated.js';

const router = express.Router()

router.post('/withdraw',isAuthenticated, withdrawAPI);
router.post('/deposit', isAuthenticated, depositAPI);
router.get('/getBalance', isAuthenticated, getBalanceAPI);


export default router;
