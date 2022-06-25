// e.RestaurantRating(id, rest_id, customer_id, rating, date_rated)

const mongoose = require('mongoose')
const adminAuth = require('../middleware/adminAuth')
const restaurantRatingSchema = new mongoose.Schema({

    rest_id: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    date_rated: {
        type: String,
        required: false,
    },

})

restaurantRatingSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('RestRating', restaurantRatingSchema)