const Submission = require('../models/Submission');

const create = async (data) => {
    return Submission.create(data);
}

const getCount = async () => {
    return Submission.count({});
}

const getAll = async (sortParams = { createdAt: 'desc' }, skip = 0, pagesize = 20) => {
    return Submission.find().populate('author').sort(sortParams).skip(skip).limit(pagesize).lean();
}

const getOne = async (slug) => {
    return await Submission.findOne({ slug: slug }).populate('author').lean();
}
const updateViews = async (id) => {
    return Submission.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } });
}
const deleteOne = async (id, ownerId) => {
    return Submission.findOneAndDelete({ _id: id, author: ownerId });
}
const updateOne = async (id, ownerId, data) => {
    return Submission.findOneAndUpdate({ _id: id, author: ownerId }, data, { runValidators: true });
}
const getRandom = async () => {
    return Submission.aggregate().sample(1);
}
const pushToField = async (id, userId, fieldName) => {
    const item = await Submission.findById(id);
    if (item[fieldName].some(x => x._id == userId)) {
        throw new Error('Already booked in this hotel');
    }
    item[fieldName].push(userId);
    return item.save();
}
const upvote = async (id, userId, fieldName) => {
    const item = await Submission.findById(id);
    if (item.author == userId) {
        throw new Error('Cannot vote on your post')
    }
    if (item[fieldName].some(x => x._id == userId)) {
        throw new Error('Already voted on this post');
    }
    item[fieldName].push(userId);
    item.rating += 1;
    return item.save();
}
const downvote = async (id, userId, fieldName) => {
    const item = await Submission.findById(id);
    if (item.author == userId) {
        throw new Error('Cannot vote on your post')
    }
    if (item[fieldName].some(x => x._id == userId)) {
        throw new Error('Already voted on this post');
    }
    item[fieldName].push(userId);
    item.rating -= 1;
    return item.save();
}
module.exports = {
    create,
    getAll,
    getOne,
    deleteOne,
    updateOne,
    pushToField,
    upvote,
    downvote,
    getCount,
    updateViews,
    getRandom
}