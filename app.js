require("dotenv").config();
require("./models/connection");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var eventsRouter = require("./routes/events");
var artistsRouter = require("./routes/artists");
var requestsRouter = require("./routes/requests");

var app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/events", eventsRouter);
app.use("/", eventsRouter);
app.use("/artists", artistsRouter);
app.use("/requests", requestsRouter);

module.exports = app;
