const jwt = require('jsonwebtoken');

const token = {
    generateRefreshToken : function (admin_id) {
        const refreshToken = jwt.sign(
            { "admin_id": admin_id },
            process.env.REFRESH_KEY,
            { expiresIn: process.env.REFRESH_EXPIRY }
        );
        return refreshToken;
    },
    generateAccessToken : function (admin_id) {
        const accessToken = jwt.sign(
            { "admin_id": admin_id },
            process.env.ACCESS_KEY,
            { expiresIn: process.env.ACCESS_EXPIRY }
        );
        return accessToken;
    }
}

module.exports = token;