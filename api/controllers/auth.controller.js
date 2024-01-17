const User = require("../models/users");
const ErrorHandler = require("../exceptions/ErrorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/jwtToken");

const register = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    sendToken(user, 200, res, req);
})

const login = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email && !password) {
        return next(new ErrorHandler("Email and Password is required."), 400)
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Email or Password is invalid."))
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Email and Password is required."), 400)
    }

    sendToken(user, 200, res, req);

})

module.exports = {
    register,
    login
}