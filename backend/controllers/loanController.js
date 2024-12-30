const Loan = require('../models/Loan');
const User = require('../models/User');

// Get Loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('customerId', 'username email');
    res.status(200).json({ loans });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching loans', error: err.message });
  }
};

// Update Loan Status
// exports.updateLoanStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const loan = await Loan.findByIdAndUpdate(id, { status }, { new: true });
//     if (!loan) return res.status(404).json({ message: 'Loan not found' });

//     res.status(200).json({ message: 'Loan status updated', loan });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating loan status', error: err.message });
//   }
// };


// Apply for a loan
exports.applyForLoan = async (req, res) => {
  const { loanAmount, interestRate, repaymentSchedule } = req.body;
  try {
    const loan = await Loan.create({
      customerId: req.user.id,
      loanAmount,
      interestRate,
      repaymentSchedule,
      status: 'Pending',
    });
    res.status(201).json({ message: 'Loan application submitted successfully', loan });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Approve or reject loan
exports.approveLoan = async (req, res) => {
  const { loanId, status } = req.body; // status = 'Approved' or 'Rejected'
  try {
    const loan = await Loan.findByIdAndUpdate(loanId, { status }, { new: true });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.status(200).json({ message: `Loan ${status.toLowerCase()} successfully`, loan });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Disburse a loan
exports.disburseLoan = async (req, res) => {
  const { loanId, disbursedAmount } = req.body;
  try {
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    if (loan.status !== 'Approved') {
      return res.status(400).json({ message: 'Loan must be approved before disbursement' });
    }

    loan.disbursedAmount = disbursedAmount;
    loan.status = 'Disbursed';
    await loan.save();

    res.status(200).json({ message: 'Loan disbursed successfully', loan });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Record loan repayment
exports.repayLoan = async (req, res) => {
  const { loanId, paymentAmount } = req.body;
  try {
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    loan.repaymentSchedule.push({ date: new Date(), amount: paymentAmount });
    loan.loanAmount -= paymentAmount;

    if (loan.loanAmount <= 0) loan.status = 'Closed';

    await loan.save();
    res.status(200).json({ message: 'Loan repayment recorded successfully', loan });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Calculate interest dynamically
exports.calculateInterest = async (req, res) => {
  const { loanId, months } = req.body;
  try {
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    const principal = loan.loanAmount;
    const rate = loan.interestRate / 100;
    const interest = principal * rate * (months / 12);

    res.status(200).json({ message: 'Interest calculated successfully', interest });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
