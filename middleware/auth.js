const jwt = require('jsonwebtoken');
const admin = require("../model/admin");

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(authHeader || typeof authHeader !== 'undefined'){
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_KEY,
            async (err, decoded) => {
                if (err){
                    return res.status(403).json({status: false, error: "Unauthorized Access"});
                }
                const check = await admin.checkAdmin(decoded.admin_id);
                if(!check.status){
                    return res.status(403).json({status: false, error: "Unauthorized Access"});
                }
                req.admin_id = decoded.admin_id;
                req.role = check.data[0].role;
                next();
            }
        );
    }
    else{
        return res.status(403).json({status: false, error: "Unauthorized Access"});
    }
}

module.exports = authToken;