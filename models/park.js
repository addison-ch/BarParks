const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ParkSchema = new Schema({
    title: String, location: String, description: String, address: String, image: String, equipment: [String], reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
})

ParkSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
module.exports = mongoose.model('Park', ParkSchema);