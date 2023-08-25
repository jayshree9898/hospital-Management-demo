const mongoose = require('mongoose');

const ambulanceSchema = mongoose.Schema({
    ambulance_type : {
        type: String,
        require: true,
    },
    price_per_hours :{
        type: Number,
        require: true,
    },
    ambulance_code :{
        type: String,
        require: true,
    },
    driver_name:{
        type: String,
        require: true,
    },
    driver_contact_no: {
        type: Number,
        require: true,

    }
});

const ambulance = mongoose.model('ambulances', ambulanceSchema);
module.exports = ambulance