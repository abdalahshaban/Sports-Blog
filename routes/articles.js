let express = require("express");
let articlesRouter = express.Router();


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

articlesRouter.post('/add', (req, res) => {
  console.log('submitted');

  let articel = new Article();
  articel.title = req.body.title;
  articel.subtitle = req.body.subtitle;
  articel.category = req.body.category;
  articel.body = req.body.body;
  articel.author = req.body.author;

  Article.addArticle(articel, (err, artical) => {
    if (!err) {
      res.redirect('/manage/articles')
    } else {
      res.send(err)
    }
  })


})


module.exports = articlesRouter;