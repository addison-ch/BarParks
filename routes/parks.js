const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validatePark } = require('../middleware.js');
const parks = require('../controllers/parks.js');


router.route('/')
    .get(catchAsync(parks.index))
    .post(isLoggedIn, validatePark, catchAsync(parks.submitPark))

router.get('/new', isLoggedIn, parks.newParkForm)

router.route('/:id')
    .get(catchAsync(parks.showPark))
    .put(isLoggedIn, validatePark, isAuthor, catchAsync(parks.updatePark))
    .delete(isLoggedIn, isAuthor, catchAsync(parks.deletePark))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(parks.editPark))
module.exports = router;