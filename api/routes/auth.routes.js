const express = require('express');
const router = express.Router();

const { register, login, forgotPassword, resetPassword, logout } = require("../controllers/auth.controller");
const { isAuthenicationedUser, authorizeRoles } = require("../middlewares/auth")

router.route("/register").post(register);
router.route("/login").post(login);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route("/logout").get(isAuthenicationedUser, logout);

module.exports = router