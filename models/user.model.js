
const mongoose = require('mongoose')
bcrypt = require('bcrypt');
const adminAuth = require('../middleware/adminAuth')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: true
    }

})

userSchema.methods.comparePassword = function (password) {
    return password == this.password;
};

userSchema.methods.fullName = function () {
    return this.username + this.last_name;
}

userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('User', userSchema)