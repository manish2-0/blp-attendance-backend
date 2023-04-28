const express = require('express');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const app = express();
const corsOptions = require('./config/corsOptions');
require('dotenv').config()
const cors = require('cors');
const adminRouter = require("./routes/adminRoutes");
const siteRouter = require("./routes/siteRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");
const cashRouter = require("./routes/cashRoutes");
const refreshRouter = require("./routes/refreshRoutes");

app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
app.use("/admin", adminRouter);
app.use("/site", siteRouter);
app.use("/employee", employeeRouter);
app.use("/attendance", attendanceRouter);
app.use("/cash", cashRouter);
app.use("/refresh", refreshRouter);

let PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
