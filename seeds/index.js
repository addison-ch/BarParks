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
            image: "https://source.unsplash.com/collection/qxWqS8q4bgo",
            description: `${sample(lorem)}`,
            equipment: ["rings", "pull-up bars", "push-up bars", "monkey bars", "poles", "machine guns"]
        })
        await park.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})