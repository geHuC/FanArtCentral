const User = require('../models/User');

const pushToField = async (id, itemId, fieldName) => {
    const user = await User.findById(id);
    if(user[fieldName].some(x => x._id == itemId)){
        //Change error message accordingly
        throw new Error('Item already exists');
    }
    user[fieldName].push(itemId);
    return user.save({ validateBeforeSave: false });
}

const getAndPopulate = async (id, field) => {
    return User.findById(id).populate({path: 'posts', populate: { path:'author'}}).lean();
}
module.exports = {
    pushToField,
    getAndPopulate
}