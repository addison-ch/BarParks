const mongoose = require('mongoose');
const Park = require('../models/park');
const cities = require('./cities');

const { places, descriptors, lorem } = require('./seedingHelp');

mongoose.connect('mongodb://localhost:27017/barparks', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexes: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("db connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Park.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const park = new Park({
            address: `${cities[randomIndex].city}, ${cities[randomIndex].province_name}, Canada`,
            title: `${sample(descriptors)}`,
            location: `${sample(places)}`,
            images: [
                {
                    _id: '6119ba163d04fd2a54efab03',
                    url: 'https://res.cloudinary.com/dzhjt6fqa/image/upload/v1629075988/BarParks/xzexosm5lrou2v5wghqw.jpg',
                    filename: 'BarParks/xzexosm5lrou2v5wghqw'
                },
                {
                    _id: '6119ba163d04fd2a54efab04',
                    url: 'https://res.cloudinary.com/dzhjt6fqa/image/upload/v1629075988/BarParks/l5vdm0h7p1u18tcnvdcz.jpg',
                    filename: 'BarParks/l5vdm0h7p1u18tcnvdcz'
                },
                {
                    _id: '6119ba163d04fd2a54efab05',
                    url: 'https://res.cloudinary.com/dzhjt6fqa/image/upload/v1629075988/BarParks/itqutswy09ajezvnqpsc.jpg',
                    filename: 'BarParks/itqutswy09ajezvnqpsc'
                },

                {
                    _id: '6119ba163d04fd2a54efab07',
                    url: 'https://res.cloudinary.com/dzhjt6fqa/image/upload/v1629075990/BarParks/ak24cjjinjba7yx6c2hl.jpg',
                    filename: 'BarParks/ak24cjjinjba7yx6c2hl'
                }
            ],
            description: `${sample(lorem)}`,
            author: '610884d3b75c072a409a6b22',
            equipment: ["rings", "pull-up bars", "push-up bars", "monkey bars", "poles", "machine guns"]
        })
        await park.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})