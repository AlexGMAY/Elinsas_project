const AuditLog = require('../models/AuditLog');

// Get All Audit Logs
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('performedBy', 'username').sort({ timestamp: -1 });
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
