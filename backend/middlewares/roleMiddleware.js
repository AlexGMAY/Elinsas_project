// Middleware to restrict access based on user role
exports.checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next(); // User has required role, proceed to the next middleware or route handler
};
  
  