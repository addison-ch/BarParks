const Park = require('./models/park');
const ExpressError = require('./utils/ExpressError');
const { parkSchema, reviewSchema } = require('./schemas.js')
const ejsMate = require('ejs-mate');

module.exports.isLoggedIn = (req, res, next) => {
    console.log("CURRENT USER...", req.user)
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in to perform this action.');
        return res.redirect('/login');
    }
    next();
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const park = await Park.findById(id);
    if (!park.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that 😟')
        res.redirect(`/parks/${id}`);
    }
    next();
}
module.exports.validatePark = (req, res, next) => {

    const { error } = parkSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(x => x.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(x => x.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor2 = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const rev = await Review.findById(reviewId);
    if (!rev.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that 😟')
        res.redirect(`/parks/${id}`);
    }
    next();
}