const express = require('express');
const cashRouter = express.Router();
const cash = require("../controller/cashController");
const authToken = require("../middleware/auth");
const { Roles, verifyRole } = require("../middleware/verifyRole");

cashRouter.post("/cash-register",authToken, verifyRole(Roles.Admin, Roles.Supervisor), cash.register);

cashRouter.put("/cash-update/:sr_no",authToken, verifyRole(Roles.Admin,Roles.Supervisor), cash.update);

cashRouter.post("/cash-report",authToken, verifyRole(Roles.Admin), cash.generateReport);

cashRouter.post("/cash-admin", authToken, cash.getCashAdmin);

cashRouter.post("/cash-supervisor", authToken, cash.getCashSupervisor);

module.exports = cashRouter;
