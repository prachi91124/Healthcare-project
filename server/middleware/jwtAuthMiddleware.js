const { validateJwtToken } = require("./jwt");

// Middleware to authenticate JWT tokens
const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader) {
        return res.status(401).json({ error: "Token not available" });
    }

    // Check if the token is in the correct format
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    try {
        // Validate the token using the function from jwtUtils
        const decoded = validateJwtToken(token);
        req.user = decoded; // Attach decoded token data to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

module.exports = { jwtAuthMiddleware };
