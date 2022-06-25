
const mongoose = require('mongoose')
const adminAuth = require('../middleware/adminAuth')
const restaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: true,
    }

})

restaurantSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Restaurant', restaurantSchema)