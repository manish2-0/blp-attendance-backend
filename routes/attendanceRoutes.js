const express = require('express');
const attendanceRouter = express.Router();
const attendance = require("../controller/attendanceController");
const authToken = require("../middleware/auth");
const { Roles, verifyRole } = require("../middleware/verifyRole");

attendanceRouter.post("/attendance-register",authToken, verifyRole(Roles.Admin, Roles.Supervisor), attendance.register);

attendanceRouter.put("/attendance-update",authToken, verifyRole(Roles.Admin), attendance.update);

attendanceRouter.post("/attendance-get",authToken, verifyRole(Roles.Admin, Roles.Supervisor), attendance.get);

attendanceRouter.post("/attendance-report",authToken, verifyRole(Roles.Admin), attendance.generateReport);

attendanceRouter.post("/attendance-admin", authToken, attendance.getAttendanceAdmin);

attendanceRouter.post("/attendance-supervisor", authToken, attendance.getAttendanceSupervisor);

module.exports = attendanceRouter;
