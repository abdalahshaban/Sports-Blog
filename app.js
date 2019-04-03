const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

const indexRouter = require("./routes/index");
const articlesRouter = require("./routes/articles");
const categoriesRouter = require('./routes/categories');
const manageRouter = require('./routes/manage')

const app = express();
//mongoose connect
mongoose.connect("mongodb://localhost:27017/sportsblog");

const db = mongoose.connection


mongoose.connection.on("open", (ref) => {
  console.log("Connected to mongo server.");

});

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Express messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator 

app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use("/", indexRouter);
app.use("/articles", articlesRouter);
app.use("/categories", categoriesRouter);
app.use('/manage', manageRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {

  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log('server conncected to 3000.....');

})

app.on('errro', (e) => {
  if (!e) {
    console.log('ok');

  } else {
    return console.log('not ok');

  }
})


module.exports = app;