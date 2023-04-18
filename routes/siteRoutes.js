const express = require('express');
const siteRouter = express.Router();
const site = require("../controller/siteController");
const authToken = require("../middleware/auth");
const { Roles, verifyRole } = require("../middleware/verifyRole");

siteRouter.post("/site-register",authToken, verifyRole(Roles.Admin), site.register);

siteRouter.put("/site-update/:site_code",authToken, verifyRole(Roles.Admin), site.update);

siteRouter.get("/site-get-all",authToken, verifyRole(Roles.Admin, Roles.Supervisor), site.getAll);

siteRouter.get("/site-get-pending",authToken, verifyRole(Roles.Admin, Roles.Supervisor), site.getAllPending);

module.exports = siteRouter;
