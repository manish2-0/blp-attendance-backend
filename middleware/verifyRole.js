exports.Roles = {
    Admin : process.env.ADMIN_KEY,
    Supervisor : process.env.SUPERVISOR_KEY
}

exports.verifyRole = (...roles) => {
    return (req, res, next) => {
        const validRoles = [...roles];
        const userRole = this.Roles[req.role];
        const check = validRoles.includes(userRole);
        if(!check){
            return res.status(403).json({status: false, error: "Access Denied"});
        }
        next();
    }
}