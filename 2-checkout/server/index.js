require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");
const router = require("./routes");

const app = express();

app.use(sessionHandler);
app.use(logger);
app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use('/api', router);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
