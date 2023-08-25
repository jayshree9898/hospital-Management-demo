const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    doctor_name:{
        type:String,
        required:true
    },
    department: {
        type: String,
        enum: ['Cardiology', 'Neurology', 'ENT', 'Ophthalmologist', 'Anesthesiologist', 'Dermatologist', 'Oncologist', 'Psychiatrist'],
        default: null,
    },
    doctor_no:{
        type:Number,
        required:true
    },
    patient_name:{
        type: String,
        required: true
    },
    patient_age:{
        type: Number,
        required: true
    },
    patient_contact_number:{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    patient_gender:{
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male' 
    },
    patient_diseases: {
        type: String,
        required: true,
    },
    patient_blood_group: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        default: null,
        required: true
    },
    patient_temperature:{
        type: String,
        required: true
    },
    patient_weight :{
        type: String,
        required: true
    },
    patient_BP:{
        type: String,
        required: true
    },
    patient_glucose:{
        type: String,
        required: true
    },
    extra_info:{
        type: String,
        required: true
    },
                  

    



});


const report = mongoose.model('reports',reportSchema);
module.exports = report;