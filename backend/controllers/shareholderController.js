const Shareholder = require('../models/Shareholder');

// Register Shareholder
exports.registerShareholder = async (req, res) => {
  const { firstName, lastName, surname, email, phone, gender, placeOfBirth, dateOfBirth, accountType, hasAssociate, submissionAgreement } = req.body;

  if (!submissionAgreement) {
    return res.status(400).json({ message: 'You must agree to the terms and conditions to register.' });
  }

  try {
    // Create shareholder
    const shareholder = await Shareholder.create({
      firstName,
      lastName,
      surname,
      email,
      phone,
      gender,
      placeOfBirth,
      dateOfBirth,
      accountType,
      hasAssociate,
      submissionAgreement,
    });

    res.status(201).json({
      message: 'Registration successful. Please log in to complete your profile.',
      shareholder,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Complete Shareholder Profile
exports.completeProfile = async (req, res) => {
    const { idCard, profession, address, associate } = req.body;
  
    try {
      const shareholder = await Shareholder.findById(req.user.id); // Assuming JWT auth with user ID
  
      if (!shareholder) return res.status(404).json({ message: 'Shareholder not found' });
  
      // Update profile
      shareholder.idCard = idCard;
      shareholder.profession = profession;
      shareholder.address = address;
  
      if (shareholder.hasAssociate && associate) {
        shareholder.associate = associate; // Includes name, email, phone, and address
      }
  
      await shareholder.save();
  
      res.status(200).json({ message: 'Profile updated successfully', shareholder });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
}; 


// Record a shareholder contribution
exports.recordContribution = async (req, res) => {
    const { shareholderId, amount } = req.body; // Amount is the contribution to be added

    try {
      const shareholder = await Shareholder.findById(shareholderId);
      if (!shareholder) {
        return res.status(404).json({ message: 'Shareholder not found' });
      }
  
      // Update contributions
      shareholder.contributions += amount;
      await shareholder.save();
  
      res.status(200).json({
        message: 'Contribution added successfully',
        shareholder,
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update Shares Owned
exports.updateSharesOwned = async (req, res) => {
    const { shareholderId, shares } = req.body; // `shares` is the new number of shares to be assigned
  
    try {
      const shareholder = await Shareholder.findById(shareholderId);
      if (!shareholder) {
        return res.status(404).json({ message: 'Shareholder not found' });
      }
  
      // Update shares
      shareholder.sharesOwned = shares;
      await shareholder.save();
  
      res.status(200).json({
        message: 'Shares owned updated successfully',
        shareholder,
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};  

// Track dividends for a shareholder
exports.trackDividend = async (req, res) => {
    const { shareholderId, dividendAmount } = req.body; // Dividend amount to be added

    try {
      const shareholder = await Shareholder.findById(shareholderId);
      if (!shareholder) {
        return res.status(404).json({ message: 'Shareholder not found' });
      }
  
      // Update dividends received
      shareholder.dividendsReceived += dividendAmount;
      await shareholder.save();
  
      res.status(200).json({
        message: 'Dividend recorded successfully',
        shareholder,
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// Admin Assigns Shareholder to Group
exports.assignGroup = async (req, res) => {
    const { shareholderId, group } = req.body;
  
    if (!['Premium 1', 'Diamond', 'Gold', 'Silver'].includes(group)) {
      return res.status(400).json({ message: 'Invalid group selection' });
    }
  
    try {
      const shareholder = await Shareholder.findByIdAndUpdate(
        shareholderId,
        { group },
        { new: true }
      );
  
      if (!shareholder) return res.status(404).json({ message: 'Shareholder not found' });
  
      res.status(200).json({ message: `Shareholder assigned to ${group} group successfully`, shareholder });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};
  
// Get Shareholder Details
exports.getShareholderDetails = async (req, res) => {
    const { shareholderId } = req.params;
  
    try {
      const shareholder = await Shareholder.findById(shareholderId);
      if (!shareholder) {
        return res.status(404).json({ message: 'Shareholder not found' });
      }
  
      res.status(200).json({ shareholder });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get All Shareholders
exports.getAllShareholders = async (req, res) => {
    try {
      const shareholders = await Shareholder.find();
      res.status(200).json({ shareholders });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get All Shareholders with Filters
exports.getShareholders = async (req, res) => {
    const { group, name } = req.query; // Group and name are passed as optional query parameters
    const filter = {};
  
    if (group) filter.group = group;
    if (name) {
      filter.$or = [
        { firstName: { $regex: name, $options: 'i' } },
        { lastName: { $regex: name, $options: 'i' } },
        { surname: { $regex: name, $options: 'i' } },
      ];
    }
  
    try {
      const shareholders = await Shareholder.find(filter);
      res.status(200).json({ shareholders });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};
  

// Update Shareholder
exports.updateShareholder = async (req, res) => {
    const { shareholderId } = req.params; // ID of the shareholder to be updated
    const updateData = req.body; // Data to update
  
    try {
      const shareholder = await Shareholder.findByIdAndUpdate(shareholderId, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validations are applied
      });
  
      if (!shareholder) {
        return res.status(404).json({ message: 'Shareholder not found' });
      }
  
      res.status(200).json({ message: 'Shareholder updated successfully', shareholder });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete Shareholder
exports.deleteShareholder = async (req, res) => {
    const { shareholderId } = req.params; // ID of the shareholder to be deleted
  
    try {
      const shareholder = await Shareholder.findByIdAndDelete(shareholderId);
      if (!shareholder) {
        return res.status(404).json({ message: 'Shareholder not found' });
      }
  
      res.status(200).json({ message: 'Shareholder deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};
  
  
  
// Filter Shareholders by Group
exports.filterShareholdersByGroup = async (req, res) => {
    const { group } = req.query; // Group is passed as a query parameter
  
    try {
      const shareholders = await Shareholder.find({ group });
      if (shareholders.length === 0) {
        return res.status(404).json({ message: `No shareholders found in group ${group}` });
      }
      res.status(200).json({ shareholders });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};
 
// Search Shareholders by Name
exports.searchShareholdersByName = async (req, res) => {
    const { name } = req.query; // Name is passed as a query parameter
  
    try {
      const shareholders = await Shareholder.find({
        $or: [
          { firstName: { $regex: name, $options: 'i' } },
          { lastName: { $regex: name, $options: 'i' } },
          { surname: { $regex: name, $options: 'i' } },
        ],
      });
  
      if (shareholders.length === 0) {
        return res.status(404).json({ message: 'No shareholders found with the given name' });
      }
  
      res.status(200).json({ shareholders });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};

