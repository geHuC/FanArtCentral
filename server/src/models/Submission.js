const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is a reqired field'],
        minlength: [6, 'Title must be at leatst 6 characters long']
    },
    category: {
        type: String,
        required: [true, 'Keyword is a reqired field'],
        minlength: [6, 'Keyword must be at leatst 6 characters long']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is reqired'],
    },
    description: {
        type: String,
        required: [true, 'Description is a reqired field'],
        minlength: [8, 'Description must be at least 8 characters long'],
        maxlength: [350, 'Description cannot be longer than 350 characters']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    nsfw: {
        type: Boolean,
        default: false
    }
},{ timestamps: true });

const Submission = mongoose.model('Submission', schema);

module.exports = Submission;