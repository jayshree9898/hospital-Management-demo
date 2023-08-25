const mongoose = require('mongoose');

var PatientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    discharge: {
        type: Boolean,
        default: false
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    contact_number: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        required: true
    },

    diseases: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: false
    },
    bed_number: {
        type: Number,
        required: false,
        ref: 'beds'

    },
    room_number: {
        type: Number,
        required: true,
    },
    department: {
        type: String,
        enum: ['Cardiology', 'Neurology', 'ENT', 'Ophthalmologist', 'Anesthesiologist', 'Dermatologist', 'Oncologist', 'Psychiatrist'],
        default: null,

    },
    doctor: {
        type: String,
        required: true,
        ref: 'doctors'
    },
    patient_blood_group: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        default: null,
        required: true

    },
    password: {
        type: String,
        required: true
    }
});

const patient = mongoose.model('patients', PatientSchema);
module.exports = patient