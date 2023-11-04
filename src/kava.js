require("dotenv").config();
const {connectDB, disconnectDB} = require("./config/db.config");
const readContracts = require("./tasks/readContracts");
const updateContracts = require("./tasks/updateContracts");
const mongoose = require("mongoose");

connectDB();
setInterval(readContracts, 5000);


