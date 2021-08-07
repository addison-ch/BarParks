
const User = require('../models/user');

module.exports.loadRegister = (req, res) => {
    res.render('auth/register.ejs')
}

module.exports.register = async (req, res) => {
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
}

module.exports.loadLogin = (req, res) => {
    res.render('auth/login.ejs')
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back, ${req.body.username}!`);
    const redirect = req.session.returnTo || '/parks';
    delete req.session.returnTo;
    res.redirect(redirect)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'See you next time! 🖐');
    res.redirect('/parks');
}
