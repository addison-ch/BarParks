const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Park = require('./models/park');
const ejsMate = require('ejs-mate');
const { parkSchema, reviewSchema } = require('./schemas.js')
const methodOverride = require('method-override');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const Review = require('./models/review');

mongoose.connect('mongodb://localhost:27017/barparks', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexes: true
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
mongoose.set('useFindAndModify', false);


const validatePark = (req, res, next) => {

    const { error } = parkSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(x => x.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(x => x.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/parks', catchAsync(async (req, res) => {
    const parks = await Park.find({});
    res.render('parks/index.ejs', { parks });
}))

app.post('/parks', validatePark, catchAsync(async (req, res, next) => {


    const park = new Park(req.body.park);
    await park.save();
    res.redirect(`/parks/${park._id}`);


}))
app.get('/parks/new', (req, res) => {
    res.render('parks/new.ejs');
})
app.get('/parks/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id);
    res.render('parks/edit.ejs', { park });
}))
app.get('/parks/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id).populate('reviews');
    res.render('parks/show.ejs', { park })
}))
app.put('/parks/:id', validatePark, catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findByIdAndUpdate(id, { ...req.body.park });
    res.redirect(`/parks/${id}`);
}))
app.delete('/parks/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Park.findByIdAndDelete(id);
    res.redirect('/parks');
}))
app.post('/parks/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const park = await Park.findById(req.params.id);
    const review = new Review(req.body.review);
    park.reviews.push(review);
    await review.save();
    await park.save();
    res.redirect(`/parks/${req.params.id}`);

}))
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

app.listen(3000, function () {
    console.log('Serving on port 3000');
})