const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const doctorSchema = mongoose.Schema({
    doctor_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    emergency_number: {
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
    department: {
        type: String,
        enum: ['Cardiology', 'Neurology', 'ENT', 'Ophthalmologist', 'Anesthesiologist', 'Dermatologist', 'Oncologist', 'Psychiatrist'],
        default: null,

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


const doctor = mongoose.model('doctors', doctorSchema);
module.exports = doctor