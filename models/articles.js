const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    category: {
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    comments: [{
        comment_subject: {
            type: String
        },
        comment_body: {
            type: String
        },
        comment_author: {
            type: String
        },
        comment_email: {
            type: String
        },
        comment_date: {
            type: String
        },
    }]
});

// mongoose.model('Articles', categorySchema)

const Article = module.exports = mongoose.model('Article', articleSchema);

//get Articles

module.exports.getArticle = (callback, limit) => {
    Article.find(callback).limit(limit).sort([
        ['titile', 'ascending']

    ])
}

//add article

module.exports.addArticle = (article, callback) => {
    Article.create(article, callback)
}


//get single Category by id

module.exports.getArticleById = (id, callback) => {
    Article.findById(id, callback)
}

//update Category

module.exports.updateArticle = (query, update, options, callback) => {
    Article.findByIdAndUpdate(query, update, options, callback)

}

//remove Article

module.exports.removeArticle = (query, callback) => {

    Article.remove(query, callback)

}

//get article by category
module.exports.getCategoryArticle = ((categoryId, callback) => {
    let query = {
        category: categoryId
    }
    Article.find(query, callback).sort([
        ['title', 'ascending']
    ])
})



///add comment
module.exports.addComment = (query, comment, callback) => {
    Article.update(query, {
        $push: {
            comments: comment
        }
    }, callback)
}