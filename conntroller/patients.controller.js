const Validator = require('validatorjs');
const _ = require('lodash'); // Import the lodash library

//.....................models..............
const Patient = require('../models/patient.model');
const Room = require('../models/room.model');


//.......................add patient...................
const addpatient = async (req, res) => {
    let validation = new Validator(req.body, {
        PD: 'required|array',
        dateOfBirth: 'required',
        firstName: 'required|string|max:50',
        lastName: 'required|string|max:50',
        sex: 'required|boolean',
        hospitalNumber: 'required:min:10|max:12'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { PD, dateOfBirth, firstName, lastName, sex, hospitalNumber } = req.body;

        const patientData = await Patient.create({
            firstName: _.capitalize(firstName),
            lastName: _.capitalize(lastName),
            sex: sex,
            dateOfBirth: dateOfBirth,
            hospitalNumber: _.toUpper(hospitalNumber),
            diseases: PD,
            lastUpdate: (new Date().getTime())
        });

        // await patientData.updateScore();

        return RESPONSE.success(res, 1301, patientData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//..............................get patient.................
const getpatients = async (req, res) => {
    try {
        const patients = await Patient.find();

        if (!patients) {
            return RESPONSE.error(res, 1307)
        }

        return RESPONSE.success(res, 1302, patients)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//  GET one patient data -> for his personal page
const getpatient = async (req, res) => {
    let validation = new Validator(req.body, {
        hospitalNumber: 'required'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { hospitalNumber } = req.body;

        const findPatients = await Patient.findOne({ hospitalNumber });
        console.log(findPatients);

        return RESPONSE.success(res, 1302, findPatients)

    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

module.exports = {
    addpatient,
    getpatients,
    getpatient
}
