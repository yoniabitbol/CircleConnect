"use strict";
exports.__esModule = true;
// eslint-disable-next-line import/no-extraneous-dependencies
var firebase_admin_1 = require("firebase-admin");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config({ path: './../.env' });
firebase_admin_1["default"].initializeApp({
    credential: firebase_admin_1["default"].credential.cert(JSON.parse(process.env.FIREBASE_SA))
});
exports["default"] = firebase_admin_1["default"];
