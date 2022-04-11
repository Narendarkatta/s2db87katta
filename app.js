var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const maogoose = require('mongoose')
var Costume = require('./models/costume');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var computerRouter = require('./routes/computer');
var addmodsRouter = require('./routes/addmods');
var selctorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();


const dbURI = 'mongodb+srv://demo:demo@cluster0.wuvl3.mongodb.net/learnMongo?retryWrites=true&w=majority';

maogoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connection to DB succeeded'))
  .catch((err) => console.log(err));

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  // await Costume.deleteMany();
  let instance1 = new
    Costume({
      costume_type: "ghost", size: 'large',
      cost: 25.4
    });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
  });
}
let reseed = true;
if (reseed) { recreateDB(); }


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/computer', computerRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selctorRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


