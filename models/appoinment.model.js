const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    patient_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    contact_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type_of_diseases: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    department: {
        type: String,
        enum: ['Cardiology', 'Neurology', 'ENT', 'Ophthalmologist', 'Anesthesiologist', 'Dermatologist', 'Oncologist', 'Psychiatrist'],
        default: null,
    },
    date_and_time: {
        type: Date,
        default: Date.now
    }
});

const appointment = mongoose.model('appointments', appointmentSchema);
module.exports = appointment