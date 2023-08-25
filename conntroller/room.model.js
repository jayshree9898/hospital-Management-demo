const Validator = require('validatorjs');

//.....................models..............
const Room = require('../models/room.model');
const patient = require('../models/patient.model');

//.............................add room.................................
const addroom = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { name } = req.body;

        const existRoom = await Room.findOne({ name: name });
        if (existRoom) {
            return RESPONSE.error(res, 1104)
        }

        const room = await Room.create({ name });

        return RESPONSE.success(res, 1101, room)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}





//...............................get room..................
const getrooms = async (req, res) => {
    try {
        const findRoom = await Room.find().sort({ name: 1 });

        var roomsJSON = {};

        for (var i = 0; i < findRoom.length; ++i) {
            roomsJSON[findRoom[i].name] = findRoom[i].availability;
        }

        return RESPONSE.success(res, 1102, roomsJSON)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


module.exports = {
    addroom,
    getrooms
}