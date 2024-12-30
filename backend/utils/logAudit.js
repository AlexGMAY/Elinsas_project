const AuditLog = require('../models/AuditLog');

// Utility function to create an audit log
const logAudit = async ({ action, entity, entityId, performedBy, details }) => {
  try {
    const log = new AuditLog({
      action,
      entity,
      entityId,
      performedBy,
      details,
    });
    await log.save();
  } catch (error) {
    console.error('Failed to log audit action:', error.message);
  }
};

module.exports = logAudit;
