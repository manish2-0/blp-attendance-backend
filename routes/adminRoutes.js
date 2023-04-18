const express = require('express');
const adminRouter = express.Router();
const admin = require("../controller/adminController");

adminRouter.post("/sdrtncdrtkcd", admin.signup);

adminRouter.post("/login", admin.login);

adminRouter.post("/logout", admin.logout);

module.exports = adminRouter;
