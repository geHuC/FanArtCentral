const User = require('../models/User');

const pushToField = async (id, itemId, fieldName) => {
    const user = await User.findById(id);
    if (user[fieldName].some(x => x._id == itemId)) {
        //Change error message accordingly
        throw new Error('Item already exists');
    }
    user[fieldName].push(itemId);
    return user.save({ validateBeforeSave: false });
}

const follow = async (username, followerId) => {
    const user = await User.findOne({ username });
    if (user.followers.some(x => x === followerId)) {
        //Change error message accordingly
        throw new Error('Already following');
    }
    user.followers.push(followerId);
    return user.save({ validateBeforeSave: false });
}
const unfollow = async (username, followerId) => {
    return User.updateOne({ username }, { $pull: {followers: followerId} });
}

const getAndPopulate = async (id, field) => {
    return User.findById(id).populate({ path: 'posts', populate: { path: 'author' } }).lean();
}
const getOne = async(id) =>{
    return User.findById(id).lean();
}
module.exports = {
    pushToField,
    getAndPopulate,
    follow,
    unfollow,
    getOne
}