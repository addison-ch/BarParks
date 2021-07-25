const express = require('express')
const router = express.Router()
const Park = require('../models/park');
const ejsMate = require('ejs-mate');
const { parkSchema, reviewSchema } = require('../schemas.js')
const methodOverride = require('method-override');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

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

router.post('/', validatePark, catchAsync(async (req, res, next) => {


    const park = new Park(req.body.park);
    await park.save();
    req.flash('success', 'Sucessfully submitted a new park!');
    res.redirect(`/parks/${park._id}`);


}))

router.get('/new', (req, res) => {
    res.render('parks/new.ejs');
})

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id);
    res.render('parks/edit.ejs', { park });
}))


router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id).populate('reviews');
    res.render('parks/show.ejs', { park })
}))

router.put('/:id', validatePark, catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await Park.findByIdAndUpdate(id, { ...req.body.park });
    res.redirect(`/parks/${id}`);
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Park.findByIdAndDelete(id);
    res.redirect('/parks');
}))

module.exports = router;