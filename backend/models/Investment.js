const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  portfolioName: { type: String, required: true },
  investmentDetails: { type: Array, default: [] }, // e.g., [{type, amount, date}]
  performanceMetrics: { type: Object, default: {} }, // e.g., {ROI, riskLevel}
});

module.exports = mongoose.model('Investment', investmentSchema);
