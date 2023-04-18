const express = require('express');
const refreshRouter = express.Router();
const refresh = require("../controller/refreshController");

refreshRouter.get("/get-access-token", refresh.getToken);

module.exports = refreshRouter;
