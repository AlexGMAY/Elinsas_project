// Middleware: Validate Query Parameters
exports.validateQueryParams = (requiredParams) => (req, res, next) => {
    const missingParams = requiredParams.filter((param) => !req.query[param]);
    if (missingParams.length > 0) {
        return res.status(400).json({
            message: `Missing query parameters: ${missingParams.join(', ')}`,
        });
    }
    next();
};
