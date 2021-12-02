const User = require('../models/User');
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const jwt = require('../utils/jwtUtility');


const login = async (userData) => {
    let { username, password } = userData;
    if (username) username = username.trim();
    if (password) password = password.trim();
    //Check to see if user exists

    const pattern = new RegExp(`^${username}$`, 'i');
    let user = await User.findOne({ username: { $regex: pattern } })
    if (!user) {
        throw new Error('Username or password invalid');
    }
    //Validate the provided password
    let passwordIsValid = await user.validatePassword(password);
    if (!passwordIsValid) {
        throw new Error('Username or password invalid');
    }
    //TODO: create token
    let payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        username: user.username,
    };

    let token = await jwt.sign(payload, JWT_TOKEN_SECRET);
    return {token, user: {username: user.username, isAdmin: user.isAdmin, _id:user._id}}
}

const register = async (userData) => {
    let { email, username, password, repeatPassword } = userData;
    if (email) email = email.trim();
    if (username) username = username.trim();
    if (password) password = password.trim();
    if (repeatPassword) repeatPassword = repeatPassword.trim();

    //Check if user already exists
    const emailPattern = new RegExp(`^${email}$`, 'i');
    let userByEmail = await User.findOne({ email: { $regex: emailPattern } });
    if (userByEmail) throw new Error('Email already in use');

    const usernamePattern = new RegExp(`^${username}$`, 'i');
    let userByUserName = await User.findOne({ username: { $regex: usernamePattern } });
    if (userByUserName) throw new Error('Username already in use');

    if (password !== repeatPassword) throw new Error('Passwords do not match');
    return User.create({ username, email, password });
}


module.exports = {
    login,
    register,
}