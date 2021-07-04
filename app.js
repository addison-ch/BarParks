const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Park = require('./models/park');

mongoose.connect('mongodb://localhost:27017/barparks', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexes: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("db connected");
});

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/parks', async (req, res) => {
    const parks = await Park.find({});
    res.render('parks/index.ejs', { parks });
})

app.post('/parks', async (req, res) => {
    const park = new Park(req.body.park);
    await park.save();
    res.redirect(`/parks/${park._id}`);

})
app.get('/parks/new', (req, res) => {
    res.render('parks/new.ejs');
})

app.get('/parks/:id', async (req, res) => {
    const { id } = req.params;
    const park = await Park.findById(id);
    res.render('parks/show.ejs', { park })
})


app.listen(3000, function () {
    console.log('Serving on port 3000');
})