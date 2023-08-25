const mongoose = require('mongoose')


const userSessionSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'nurse'],
        //    required : false
    },
    token: {
        type: String
    },
    deleted_at: {
        type: Date,
        required: false
    }
}, {
    timestamps: { created_At: 'created_at', updated_At: 'updated_at' },
    toJSON: {
        getters: true,
        setters: true
    },
    toObject: {
        getters: true,
        setters: true
    }
});


const userSession = mongoose.model('userSessions', userSessionSchema)
module.exports = userSession