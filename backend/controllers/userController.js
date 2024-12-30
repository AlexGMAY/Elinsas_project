const User = require('../models/User');

// Create customer
exports.createCustomer = async (req, res) => {
  const { username, email, phone, profileDetails } = req.body;
  try {
    const customer = await User.create({
      role: 'Customer',
      username,
      email,
      phone,
      profileDetails,
    });
    res.status(201).json({ message: 'Customer created successfully', customer });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'Customer' });
    res.status(200).json({ customers });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update customer profile
exports.updateCustomer = async (req, res) => {
  const { customerId, updates } = req.body;
  try {
    const customer = await User.findByIdAndUpdate(customerId, updates, { new: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json({ message: 'Customer updated successfully', customer });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  const { customerId } = req.body;
  try {
    const customer = await User.findByIdAndDelete(customerId);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
