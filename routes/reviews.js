const express = require('express')
const router = express.Router({ mergeParams: true })
const Review = require('../models/review');
const ejsMate = require('ejs-mate');
const { parkSchema, reviewSchema } = require('../schemas.js')
const methodOverride = require('method-override');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Park = require('../models/park');
const { isLoggedIn, isAuthor, validatePark, validateReview, isAuthor2 } = require('../middleware.js');


router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const park = await Park.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    park.reviews.push(review);
    await review.save();
    await park.save();
    req.flash('success', 'New review has been added');
    res.redirect(`/parks/${req.params.id}`);

}))

router.delete('/:reviewId', isLoggedIn, isAuthor2, catchAsync(async (req, res) => {
    await Park.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } })
    await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/parks/${req.params.id}`)
}))

module.exports = router;