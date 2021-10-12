if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();

}


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const parksRoutes = require('./routes/parks');
const reviewsRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/barparks';

mongoose.connect(dbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexes: true, useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("db connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

const secretkey = process.env.SECRET || 'squirrel'

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secretkey
    }
});

const sessionConfig = {
    store: store,
    name: 'sess',
    secret: secretkey,
    resave: false, saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();

})

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.use("/", userRoutes);
app.use("/parks", parksRoutes);
app.use("/parks/:id/reviews/", reviewsRoutes);

app.all("*", (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Oh no! Something went wrong :("
    }
    res.status(statusCode).render('errors.ejs', { err })
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Serving on port ${port}`);
})