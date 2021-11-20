const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [5, 'Username must be at leats 5 characters long'],
        validate: [/^[a-zA-Z0-9_]+$/, 'Username can contain only alphanumeric characters and undescore "_"']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [/^[A-Za-z0-9_.]+@+[A-Za-z]+.+[A-Za-z]+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at leats 8 characters long'],
        //validate: [/^[a-zA-Z0-9]+$/, 'Password can contain only alphanumeric characters']
    },
    avatar: {
        type: String,
        default: '/static/noAvatar.png'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        default: []
    }],
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        default: []
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBan: {
        type: Boolean,
        default: false
    },
    banUntil: {
        type: Date
    },
    lastOnline: {
        type: Date
    },
});

//check if user exists

//Hash the password
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        return bcrypt.hash(this.password, SALT_ROUNDS)
            .then(hash => {
                this.password = hash;
                return next();
            });
    } else {
        return next();
    }
});

//Validate password
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;