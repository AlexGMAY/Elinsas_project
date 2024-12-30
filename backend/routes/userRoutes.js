const express = require('express');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/create', verifyToken, checkRole(['Admin']), createCustomer);
router.get('/all', verifyToken, checkRole(['Admin', 'Loan Officer']), getCustomers);
router.patch('/update', verifyToken, checkRole(['Admin']), updateCustomer);
router.delete('/delete', verifyToken, checkRole(['Admin']), deleteCustomer);

module.exports = router;
