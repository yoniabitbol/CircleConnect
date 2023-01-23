"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var mongoose_1 = require("mongoose");
var app_1 = require("./app");
dotenv_1["default"].config({ path: './../.env' });
var DB = process.env.DB;
mongoose_1["default"].set('strictQuery', false);
mongoose_1["default"].connect(DB).then(function () {
    console.log('Server-DB Connection Successful!');
});
var port = 4000;
app_1["default"].listen(port, function () {
    console.log("App listening on port ".concat(port));
});
