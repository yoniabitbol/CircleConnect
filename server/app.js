"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userRoutes_1 = require("./routes/userRoutes");
var decodeToken_1 = require("./middleware/decodeToken");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(decodeToken_1["default"]);
app.use('/api/users', userRoutes_1["default"]);
app.get('/', function (req, res) {
    res.send('Default Route');
});
app.all('*', function (req, res) {
    res.status(400).json({
        status: 'failure',
        message: "Cannot find ".concat(req.originalUrl, " on this server!")
    });
});
exports["default"] = app;
