const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  repaymentSchedule: { type: Array, default: [] }, // e.g., [{date, amount}]
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Active', 'Closed'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('Loan', loanSchema);
