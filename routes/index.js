const express = require('express');
const indexRouter = express.Router();

Article = require('../models/articles');

/* GET home page. */
indexRouter.get('/', function (req, res, next) {
  Article.getArticle((err, articles) => {
    res.render('index', {
      title: 'index',
      articles: articles
    });
  }, 2)

});

module.exports = indexRouter;