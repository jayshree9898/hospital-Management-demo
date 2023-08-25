const mongoose = require('mongoose');

const bedSchema = mongoose.Schema({
    bed_number: {
        type: Number,
        required: true,
        // unique: true
    },
    room_number: {
        type: Number,
        require: true,

    },
    is_available: {
        type: String,
        default: 'available'
    },
});

// bedSchema.virtual('patients', {
//     ref: 'patients',
//     localField: '_id',
//     foreignField: 'report_id'
// });

const bed = mongoose.model('beds', bedSchema);
module.exports = bed