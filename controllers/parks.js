const Park = require('../models/park');

module.exports.index = async (req, res) => {
    const parks = await Park.find({});
    res.render('parks/index.ejs', { parks });
}

module.exports.newParkForm = (req, res) => {
    return res.render('parks/new.ejs');
}

module.exports.submitPark = async (req, res, next) => {

    const park = new Park(req.body.park);
    console.log(req.files)
    park.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    park.author = req.user._id;
    await park.save();
    req.flash('success', 'Sucessfully submitted a new park!');
    res.redirect(`/parks/${park._id}`);
}

module.exports.editPark = async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id);
    if (!park) {
        req.flash('error', 'That park does not exist😟');
        return res.redirect('/parks')
    }

    res.render('parks/edit.ejs', { park });
}

module.exports.showPark = async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id).populate({
        path: 'reviews', populate: { path: 'author' }
    }).populate('author');
    if (!park) {
        req.flash('error', 'Park does not exist.');
        res.redirect('/parks')
    }
    res.render('parks/show.ejs', { park })
};

module.exports.updatePark = async (req, res) => {
    const { id } = req.params;
    console.log(req.files)
    const park = await Park.findByIdAndUpdate(id, { ...req.body });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    park.images.push(...imgs);
    await park.save();
    req.flash('success', 'Sucessfully updated park information. 👍')
    res.redirect(`/parks/${id}`);
}

module.exports.deletePark = async (req, res) => {
    const { id } = req.params;
    await Park.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted park. 👎')
    res.redirect('/parks');
}