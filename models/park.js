const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkSchema = new Schema({
    title: String, location: String, description: String, address: String, image: String, equipment: [String], reviews: [{type: Schema.Types.ObjectId, ref: "Review"}]
})

module.exports = mongoose.model('Park', ParkSchema);