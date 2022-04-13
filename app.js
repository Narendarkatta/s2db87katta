var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const connectionString =
  "mongodb+srv://demo:demo@cluster0.wuvl3.mongodb.net/learnMongo?retryWrites=true&w=majority";
mongoose = require("mongoose");
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var Costume = require("./models/costume");
var Laptop = require("./models/laptop");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var laptopsRouter = require("./routes/laptops");
var computerRouter = require("./routes/computer");
var addmodsRouter = require("./routes/addmods");
var selectorRouter = require("./routes/selector");
var resourceRouter = require("./routes/resource");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/computer", computerRouter);
app.use("/laptops", laptopsRouter);
app.use("/addmods", addmodsRouter);
app.use("/selector", selectorRouter);
app.use("/resource", resourceRouter);

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

module.exports = app;

/// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await Costume.deleteMany();

  let instance1 = new Costume({
    costume_type: "Mummy",
    size: "large",
    cost: 12.4,
  });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved in Costume");
  });

  let instance2 = new Costume({ costume_type: "Dog", size: "small", cost: 16 });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved in Costume");
  });

  let instance3 = new Costume({
    costume_type: "Superman",
    size: "medium",
    cost: 12.4,
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved in Costume");
  });

  let instance4 = new Costume({ costume_type: "Cat", size: "large", cost: 22 });
  instance4.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Fourth object saved in Costume");
  });

  // Delete everything in Laptop
  await Laptop.deleteMany();

  let instance5 = new Laptop({
    laptop_brand: "Apple",
    laptop_model: "Mac book",
    laptop_cost: 6205,
  });
  instance5.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved in Laptop");
  });

  let instance6 = new Laptop({
    laptop_brand: "Samsung",
    laptop_model: "Ativ",
    laptop_cost: 5207,
  });
  instance6.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved in Laptop");
  });

  let instance7 = new Laptop({
    laptop_brand: "Dell",
    laptop_model: "latitude",
    laptop_cost: 4034,
  });
  instance7.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved in Laptop");
  });

  let instance8 = new Laptop({
    laptop_brand: "Acer",
    laptop_model: "Aspire",
    laptop_cost: 1950,
  });
  instance8.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Fourth object saved in Laptop");
  });
}
let reseed = true;
if (reseed) {
  recreateDB();
}

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});
