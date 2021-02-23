var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    localStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    User             = require("./models/user"),
    flash            = require("connect-flash")
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment");
    seedDB           = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds");
	commentRoutes    = require("./routes/comments");
	indexRoutes      = require("./routes/index")

// seedDB();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
mongoose.connect("mongodb+srv://hammad52:Zainab@786@cluster0.xxio3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "My name is Hammad Ansari",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP);
