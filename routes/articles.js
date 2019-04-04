let express = require("express");
let articlesRouter = express.Router();
let mongoose = require('mongoose');
require('../models/category.js');
let categorySchema = mongoose.model('Category')

const Article = require('../models/articles');

articlesRouter.get("/", (req, res, next) => {
  // res.send('articles');
  res.render("articels", {
    title: "Articels"
  });
});

articlesRouter.get("/show/:id", (req, res, next) => {
  res.render("articel", {
    title: "Articel"
  });
});


articlesRouter.get("/category/:category_id", (req, res, next) => {
  res.render("articels", {
    title: "Category Articles"
  });
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
      console.log(articel)
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
      console.log(data)
      res.redirect('/manage/articles')
      // res.status(200)
    }
  })
})




module.exports = articlesRouter;