// d.orders: (id, rest_id, menu_id, customer_id, quantity, date_created)


const mongoose = require('mongoose')
const adminAuth = require('../middleware/adminAuth')
const ordersSchema = new mongoose.Schema({
    

    rest_id: {
        type: String,
        required: true
    },
    menu_id: {
        type: String,
        required: true
    },

    customer_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    date_created: {
        type: String,
        required: false,
    },

})

ordersSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Orders', ordersSchema)