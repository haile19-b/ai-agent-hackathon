"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post("/register", auth_controller_1.register);
exports.authRoute.post("/login", auth_controller_1.login);
exports.authRoute.get("/logout", auth_controller_1.logout);
exports.default = exports.authRoute;
//# sourceMappingURL=auth.route.js.map