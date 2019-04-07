let express = require("express");
let articlesRouter = express.Router();
let mongoose = require('mongoose');
require('../models/category.js');
let categorySchema = mongoose.model('Category')

const Article = require('../models/articles');

articlesRouter.get("/", (req, res, next) => {
  Article.getArticle((err, articles) => {
    res.render('articles', {
      title: 'articles',
      articles: articles
    });
  }, 2)
});

articlesRouter.get("/show/:id", (req, res, next) => {
  Article.getArticleById(req.params.id, (err, article) => {
    res.render("article", {
      title: "Articel",
      article: article
    });
  })

});


articlesRouter.get("/category/:category_id", (req, res, next) => {
  Article.getCategoryArticle(
    req.params.category_id, (err, articles) => {
      // console.log(articles);
      categorySchema.findById(req.params.category_id, (err, category) => {
        res.render("articles", {
          title: category.title + "  Category Articles",
          articles: articles
        });
      })

    })

});


// add article -post

articlesRouter.get('/add', (req, res) => {
  res.render('add_article')
})

articlesRouter.post('/add', (req, res) => {
  req.checkBody('title', 'title is required').notEmpty();
  req.checkBody('author', 'author is required').notEmpty();
  req.checkBody('category', 'title is required').notEmpty();
  req.checkBody('body', 'body is required').notEmpty();
  req.checkBody('category', 'title is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    categorySchema.find({}, (err, categories) => {
      res.render('add_article', {
        errors: errors,
        categories: categories,
        title: "create article"
      })
    })
  } else {
    let articel = new Article();
    articel.title = req.body.title;
    articel.subtitle = req.body.subtitle;
    articel.category = req.body.category;
    articel.body = req.body.body;
    articel.author = req.body.author;

    Article.addArticle(articel, (err, artical) => {
      if (!err) {
        // console.log(artical);
        req.flash('success', 'article added')
        res.redirect('/manage/articles')
      } else {
        res.send(err)
      }
    })
  }



});

articlesRouter.post('/edit/:id', (req, res) => {
  // console.log('submitted');

  let articel = new Article();
  const query = {
    _id: req.params.id
  }
  const update = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    category: req.body.category,
    author: req.body.author,
    body: req.body.body
  }
  Article.updateArticle(query, update, {
    new: true
  }, (err, articel) => {
    if (err) {
      res.send(err)
    } else {
      // console.log(articel)
      req.flash('success', 'Article Updated')
      res.redirect('/manage/articles')
    }
  })


});
articlesRouter.delete('/delete/:id', (req, res) => {
  query = {
    _id: req.params.id
  }
  Article.removeArticle(query, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      // console.log(data)

      res.redirect('/manage/articles')
      // req.flash('error', 'Article deleted')
      // res.status(200)
    }
  })
})

articlesRouter.post('/comments/add/:id', (req, res) => {
  req.checkBody('comment_subject', "Subject is required").notEmpty();
  req.checkBody('comment_author', "Author is required").notEmpty();
  req.checkBody('comment_body', "body is required").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    Article.getArticleById(req.params.id, (err, article) => {
      res.render('article', {
        title: 'Article',
        article: article,
        errors: errors
      })
    })
  } else {
    let article = new Article();
    let query = {
      _id: req.params.id
    }

    let comment = {
      comment_subject: req.body.comment_subject,
      comment_author: req.body.comment_author,
      comment_body: req.body.comment_body,
      comment_email: req.body.comment_email
    }

    Article.addComment(query, comment, (err, article) => {
      res.redirect('/articles/show/' + req.params.id)
    })

  }




})



module.exports = articlesRouter;