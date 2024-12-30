const express = require('express');
const { getAuditLogs } = require('../controllers/auditLogController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/', verifyToken, checkRole(['Admin']), getAuditLogs);

module.exports = router;
