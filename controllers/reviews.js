const Review = require('../models/review');
const Park = require('../models/park');

module.exports.addReview = async (req, res) => {
    const park = await Park.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    park.reviews.push(review);
    await review.save();
    await park.save();
    req.flash('success', 'New review has been added');
    res.redirect(`/parks/${req.params.id}`);
}

module.exports.deleteReview = async (req, res) => {
    await Park.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } })
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Review deleted successfully 🤠')
    res.redirect(`/parks/${req.params.id}`)
}