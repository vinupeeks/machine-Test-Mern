import express from 'express';
import { dashboard, deleteEmployees, editEmployees, login, signup } from '../Controllers/User.js';
import { addEmployee, getEmployees } from '../Controllers/User.js';
import verifyToken from '../verifyToken/verifyToken.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/dashboard').get(verifyToken, dashboard);


router.route('/employee').post(verifyToken, addEmployee);
router.route('/employees').get(verifyToken, getEmployees);
router.route('/employee/:id').put(verifyToken, editEmployees)
router.route('/employee/:id').delete(verifyToken, deleteEmployees)

export default router;

