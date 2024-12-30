const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auditLogSchema = new Schema({
  action: { type: String, required: true }, // e.g., "Loan Approval", "Shareholder Update"
  entity: { type: String, required: true }, // e.g., "Loan", "Shareholder"
  entityId: { type: Schema.Types.ObjectId, required: true }, // ID of the affected entity
  performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Admin/User performing the action
  timestamp: { type: Date, default: Date.now },
  details: { type: String }, // Additional details about the action
});

module.exports = mongoose.model('AuditLog', auditLogSchema);

