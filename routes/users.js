const express = require('express');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const auth = require('../controllers/auth.js');
const router = express.Router()

router.route('/register')
    .get(auth.loadRegister)
    .post(catchAsync(auth.register))

router.route('/login')
    .get(auth.loadLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.login)

router.get('/logout', auth.logout)

module.exports = router;