module.exports.isLoggedIn = (req, res, next) => {
    console.log("CURRENT USER...", req.user)
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in to perform this action.');
        return res.redirect('/login');
    }
    next();
}