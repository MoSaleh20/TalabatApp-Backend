// c.	customer: (id, first_name, last_name, phone)

const mongoose = require('mongoose')
const adminAuth = require('../middleware/adminAuth')
const customerSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true,
    },

})


customerSchema.methods.getFullname = function () {
    return this.first_name + this.username
}

customerSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Customer', customerSchema)