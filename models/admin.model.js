const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    birthdate: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    education: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => bcrypt.hashSync(value, 10)
    },
});

const admin = mongoose.model('admins', adminSchema);
module.exports = admin