// b.menu: (id, rest_id, name, descr, price, image)


const mongoose = require('mongoose')
const adminAuth = require('../middleware/adminAuth')
const menuSchema = new mongoose.Schema({


    rest_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }

})

menuSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Menu', menuSchema)