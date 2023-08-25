const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const nurseSchema = mongoose.Schema({
    name: {
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
    blood_group: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        default: null,
        required: true
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
    other_info: {
        type: String,
        required: false
    }

});


const nurse = mongoose.model('nurses', nurseSchema);
module.exports = nurse