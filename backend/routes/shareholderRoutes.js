const express = require('express');
const {
  registerShareholder,
  completeProfile,
  recordContribution,
  updateSharesOwned,
  trackDividend,
  assignGroup,
  getShareholderDetails,
  getAllShareholders,
  getShareholders,
  updateShareholder,
  deleteShareholder,
  filterShareholdersByGroup,
  searchShareholdersByName,
  notifyShareholderContribution,
} = require('../controllers/shareholderController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const { validateQueryParams } = require('../middlewares/validateQueryParams');

const router = express.Router();

// Shareholder Management Endpoints
router.post('/register', verifyToken, checkRole(['Admin']), registerShareholder);
router.put('/complete-profile', verifyToken, checkRole(['Shareholder']), completeProfile);
router.post('/contribute', verifyToken, checkRole(['Admin']), recordContribution);
router.put('/update-shares', verifyToken, checkRole(['Admin']), updateSharesOwned);
router.post('/dividend', verifyToken, checkRole(['Admin']), trackDividend);
router.put('/assign-group', verifyToken, checkRole(['Admin']), assignGroup);

// Shareholder Data Retrieval Endpoints
router.get('/:shareholderId', verifyToken, checkRole(['Admin', 'Shareholder']), getShareholderDetails);
router.get('/', verifyToken, checkRole(['Admin']), getAllShareholders);
router.get('/filter', verifyToken, checkRole(['Admin']), getShareholders); // didnt work - to be retested

// Shareholder Search and Filter Endpoints
router.get('/filter-by-group', verifyToken, checkRole(['Admin']), validateQueryParams(['group']), filterShareholdersByGroup); // to be retested
router.get('/search-by-name', verifyToken, checkRole(['Admin']),  validateQueryParams(['name']), searchShareholdersByName); // to be retested

// Shareholder Modification Endpoints
router.put('/:shareholderId', verifyToken, checkRole(['Admin']), updateShareholder);
router.delete('/:shareholderId', verifyToken, checkRole(['Admin']), deleteShareholder);

// Shareholder Notification
router.post('/shareholder-contribution/:shareholderId', verifyToken, checkRole(['Admin']), notifyShareholderContribution);

module.exports = router;
