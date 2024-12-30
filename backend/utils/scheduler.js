const cron = require('node-cron');
const { notifyLoanRepayment } = require('../controllers/loanController');
const { notifyShareholderContribution } = require('../controllers/shareholderController');

const start = () => {
    // Loan Repayment Reminder Task
    cron.schedule('0 9 * * *', () => {
      console.log('Running Loan Repayment Reminder Task...');
      notifyLoanRepayment();
    });
  
    // Shareholder Contribution Reminder Task
    cron.schedule('0 10 * * *', () => {
      console.log('Running Shareholder Contribution Reminder Task...');
      notifyShareholderContribution();
    });
};
  
module.exports = { start };