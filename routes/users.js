const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('auth/register.ejs')
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) {
                return next();
            }
            else {
                req.flash('success', `Welcome to BarParks, ${username}!`);
                res.redirect('/parks')
            }
        })

    }
    catch (err) {
        req.flash('error', err.message)
        res.redirect('register')
    }
}))

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {

    req.flash('success', `Welcome back, ${req.body.username}!`);
    const redirect = req.session.returnTo || '/parks';
    delete req.session.returnTo;
    res.redirect(redirect)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'See you next time! 🖐');
    res.redirect('/parks');
})
module.exports = router;