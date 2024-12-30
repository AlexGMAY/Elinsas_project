const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const {      
    getLoans,     
    applyForLoan, 
    approveLoan, 
    repayLoan,
    calculateInterest,
    disburseLoan, 
} = require('../controllers/loanController');

const router = express.Router();


router.get('/all', verifyToken, checkRole(['Admin', 'Loan Officer', 'Customer']), getLoans);
router.post('/apply', verifyToken, checkRole(['Customer']), applyForLoan);
router.patch('/approve', verifyToken, checkRole(['Admin', 'Loan Officer']), approveLoan);
router.post('/repay', verifyToken, checkRole(['Customer']), repayLoan);
router.post('/disburse', verifyToken, checkRole(['Admin']), disburseLoan);
router.post('/calculate-interest', verifyToken, checkRole(['Admin', 'Loan Officer']), calculateInterest);

module.exports = router;
