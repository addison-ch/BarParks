const express = require('express')
const router = express.Router()
const Park = require('../models/park');
const ejsMate = require('ejs-mate');
const { parkSchema, reviewSchema } = require('../schemas.js')
const methodOverride = require('method-override');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isAuthor, validatePark } = require('../middleware.js');
const parks = require('../controllers/parks.js');



router.get('/', catchAsync(parks.index))

router.post('/', isLoggedIn, validatePark, catchAsync(parks.submitPark))

router.get('/new', isLoggedIn, parks.newParkForm)

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(parks.editPark))

router.get('/:id', catchAsync(parks.showPark))

router.put('/:id', isLoggedIn, validatePark, isAuthor, catchAsync(parks.updatePark))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(parks.deletePark))

module.exports = router;