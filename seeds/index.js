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
            geometry: {
                type: "Point",
                coordinates: [cities[randomIndex].lng, cities[randomIndex].lat]
            },
            images: [{
                _id: "6131b633ebacb42e9484c6c8",
                url: "https://res.cloudinary.com/dzhjt6fqa/image/upload/v1630647855/BarParks/ozidrortnhz8k6he6hel.jpg",
                filename: "BarParks/ozidrortnhz8k6he6hel"
            }, {
                _id: "6131b633ebacb42e9484c6c9",
                url: "https://res.cloudinary.com/dzhjt6fqa/image/upload/v1630647855/BarParks/mvxdq0cz9dp3zaxqxewp.jpg",
                filename: "BarParks/mvxdq0cz9dp3zaxqxewp"
            }, {
                _id: "6131b633ebacb42e9484c6ca",
                url: "https://res.cloudinary.com/dzhjt6fqa/image/upload/v1630647856/BarParks/rnqmkomo3gk49dsqxzfl.png",
                filename: "BarParks/rnqmkomo3gk49dsqxzfl"
            }
            ],
            description: `${sample(lorem)}`,
            author: '6131b38f71a99b0100b70137',
            equipment: ["rings", "pull-up bars", "push-up bars", "monkey bars", "poles", "machine guns"]
        })
        await park.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})