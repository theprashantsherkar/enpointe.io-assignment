import express from 'express';
import { isAuthenticated } from '../utils/isAuthenticated.js';
import {
    BankerloginAPI,
    changePasswordAPI,
    CustomerloginAPI,
    getUserAPI,
    logoutAPI,
    registerAPI
} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', registerAPI)
router.post('/customer/login', CustomerloginAPI);
router.post('/banker/login', BankerloginAPI);
router.get('/logout',isAuthenticated, logoutAPI)
router.get('/user',isAuthenticated, getUserAPI)
router.put('/changePassword',isAuthenticated, changePasswordAPI);

export default router;