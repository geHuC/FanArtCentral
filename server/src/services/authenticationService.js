const User = require('../models/User');
const  JWT_TOKEN_SECRET  = process.env.JWT_TOKEN_SECRET;
const jwt = require('../utils/jwtUtility');


const login = async (userData) => {
    let { username, password } = userData;
    username = username.trim();
    password = password.trim();
    //Check to see if user exists

    const pattern = new RegExp(`^${username}$`, 'i');
    let user = await User.findOne({ username: { $regex: pattern } })
    if (!user) {
        throw new Error('Email or password invalid');
    }
    //Validate the provided password
    let passwordIsValid = await user.validatePassword(password);
    if (!passwordIsValid) {
        throw new Error('Email or password invalid');
    }
    //TODO: create token
    let payload = {
        _id: user._id,
        username: user.username,
    };

    return jwt.sign(payload, JWT_TOKEN_SECRET);
}

const register = async (userData) => {
    let { email, username, password, repeatPassword } = userData;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    repeatPassword = repeatPassword.trim();

    //Check if user already exists
    const pattern = new RegExp(`^${email}$`, 'i');
    let userByEmail = await User.findOne({ email: { $regex: pattern } })
    if (userByEmail) {
        throw new Error('Email already in use');
    }
    const pattern = new RegExp(`^${username}$`, 'i');
    let userByUserName = await User.findOne({ username: { $regex: pattern } })
    if (userByUserName) {
        throw new Error('Username already in use');
    }

    return User.create({  username, email, password });
}


module.exports = {
    login,
    register,
}