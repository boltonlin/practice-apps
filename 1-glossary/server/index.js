require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./routes");
const morgan = require("morgan");

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use('/api', router);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
