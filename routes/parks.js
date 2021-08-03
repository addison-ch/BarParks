const express = require('express')
const router = express.Router()
const Park = require('../models/park');
const ejsMate = require('ejs-mate');
const { parkSchema, reviewSchema } = require('../schemas.js')
const methodOverride = require('method-override');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware.js');

const validatePark = (req, res, next) => {

    const { error } = parkSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(x => x.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const parks = await Park.find({});
    res.render('parks/index.ejs', { parks });
}))

router.post('/', isLoggedIn, validatePark, catchAsync(async (req, res, next) => {


    const park = new Park(req.body.park);
    await park.save();
    req.flash('success', 'Sucessfully submitted a new park!');
    res.redirect(`/parks/${park._id}`);


}))

router.get('/new', isLoggedIn, (req, res) => {

    return res.render('parks/new.ejs');



})

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id);
    res.render('parks/edit.ejs', { park });
}))


router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id).populate('reviews');
    if (!park) {
        req.flash('error', 'Park does not exist.');
        res.redirect('/parks')
    }
    res.render('parks/show.ejs', { park })
}))

router.put('/:id', isLoggedIn, validatePark, catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findByIdAndUpdate(id, { ...req.body.park });
    req.flash('success', 'Sucessfully updated park information. 👍')
    res.redirect(`/parks/${id}`);
}))

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Park.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted park. 👎')
    res.redirect('/parks');
}))

module.exports = router;