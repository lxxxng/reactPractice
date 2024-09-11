const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    // Check if access token is present
    if (!accessToken) return res.json({ error: "User not logged in" });

    try {

        const validToken = verify(accessToken, "importantsecret");
        req.user = validToken; // can accss from everywhere that uses this middleware
       
        if (validToken) {
            return next();
        }
    } catch (err) {
        // Return the error if verification fails
        return res.json({ error: err.message });
    }
};

module.exports = { validateToken };
