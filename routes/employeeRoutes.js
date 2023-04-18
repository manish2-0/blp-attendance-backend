const express = require('express');
const employeeRouter = express.Router();
const employee = require("../controller/employeeController");
const authToken = require("../middleware/auth");
const { Roles, verifyRole } = require("../middleware/verifyRole");

employeeRouter.post("/employee-register",authToken, verifyRole(Roles.Admin), employee.register);

employeeRouter.put("/employee-update/:er_no",authToken, verifyRole(Roles.Admin), employee.update);

employeeRouter.get("/employee-get-all",authToken, verifyRole(Roles.Admin, Roles.Supervisor), employee.getAll);

employeeRouter.get("/employee-get-one/:er_no",authToken, verifyRole(Roles.Admin, Roles.Supervisor), employee.getOne);

module.exports = employeeRouter;
