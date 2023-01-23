"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var router = express_1["default"].Router();
router.route('/').get(userController_1["default"].getAllUsers).post(userController_1["default"].createUser);
router.route(':id').get(userController_1["default"].getUser)
    .patch(userController_1["default"].updateUser)["delete"](userController_1["default"].deleteUser);
exports["default"] = router;
