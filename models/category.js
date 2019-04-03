const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});

mongoose.model('Category', categorySchema)

// module.exports.getCategories = (callback, limit) => {
//     Category.find(callback).limit(limit).sort([
//         ['title', 'ascending']
//     ])

// }