const express = require('express');
const manageRouter = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/articles');
require('../models/category');
let categorySchema = mongoose.model('Category')

manageRouter.get('/articles', (req, res, next) => {
    Article.getArticle((err, articles) => {
        if (err) {
            res.send(err)
        } else {
            res.render('manage_articels', {
                title: 'Manage Articels',
                articles: articles
            });

        }
    })


});

manageRouter.get('/categories', (req, res, next) => {
    categorySchema.find({}, (err, data) => {
        if (!err) {
            // console.log(data);
            res.render('manage_categories', {
                categories: data
            });

        } else {
            res.sendStatus(404).send('error....')

        }
    }).limit().sort([
        ['title']
    ])


});

manageRouter.get('/articles/add', (req, res) => {
    categorySchema.find({}, (err, data) => {
        if (err) {

            res.sendStatus(404).send('error....')

        } else {
            // console.log(data);
            res.render('add_article', {
                title: 'create Articel',
                categories: data
            })


        }
    })


});

manageRouter.get('/categories/add', (req, res) => {
    res.render('add_category', {
        title: 'create Category'
    })
})

manageRouter.get('/articels/edit/:id', (req, res, next) => {
    Article.getArticleById(req.params.id, (err, article) => {
        // console.log(article)
        if (err) {
            res.send(err)
        } else {
            categorySchema.find({}, (err, categories) => {
                res.render('edit_article', {
                    title: 'Edit Article',
                    article: article,
                    categories: categories
                });
            })

        }
    })

});

manageRouter.get('/categories/edit/:id', (req, res, next) => {
    categorySchema.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render('edit_category', {
                title: 'Edit Category',
                category: data
            });
        } else {
            return console.log(err);

        }
    })



});





module.exports = manageRouter;