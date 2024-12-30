const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/dbConfig');


// Routes Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');
const shareholderRoutes = require('./routes/shareholderRoutes');

// Env config
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();


// Routes
app.use('/api/auth', authRoutes);  // Routes for Authentication
app.use('/api/users', userRoutes); // Routes for Users(All)
app.use('/api/loans', loanRoutes); // Routes for Loans Management
app.use('/api/shareholders', shareholderRoutes); // Routes for Loans Management

// Root Routes
app.get('/', (req, res) => {
    res.send('Welcome to Elinsas API');
});

// Start server
const PORT = process.env.PORT || 5523;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
