const Validator = require('validatorjs');

const config = require('../config/config')

//...............................models.............
const Nurse = require('../models/nurse.model');
const Patient = require('../models/patient.model')
const Beds = require('../models/beds.model');
const Appointment = require('../models/appoinment.model');


//.........................get nurse profile..............
const getProfile = async (req, res) => {
    try {
        const authUser = req.user;
        if (authUser.role != 'nurse') {
            return RESPONSE.error(res, 1205)
        }

        const findData = await Nurse.findOne({ _id: authUser._id }, '-password');
        if (!findData) {
            return RESPONSE.error(res, 1206)
        }

        return RESPONSE.success(res, 1202, findData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
};


//.......................update profile....................
const updateProfile = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string',
        age: 'required|numeric',
        contact_number: 'required|numeric',
        gender: 'required|in:male,female,other',
        blood_group: 'required|in:A+, A-, B+, B-, AB+, AB-, O+, O-',
        birthdate: 'required|date',
        education: 'required|string',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { name, age, contact_number, gender, blood_group, birthdate, education } = req.body;

        const authUser = req.user;
        if (authUser.role != 'nurse') {
            return RESPONSE.error(res, 1205)
        }

        const findData = await Nurse.findOne({ _id: authUser._id }, '-password');

        const updateProfile = await Nurse.updateOne({ name, age, contact_number, gender, blood_group, birthdate, education })
        if (!findData) {
            return RESPONSE.error(res, 1206)
        }

        return RESPONSE.success(res, 1207, updateProfile)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//...................add patients..............................
const addPatients = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string',
        age: 'required|numeric',
        email: 'required|email',
        date: "required|date",
        gender: 'required|in:male,female,other',
        discharge: 'required|in:true,false', // true discharge  false no discharge
        dateOfBirth: 'required|date',
        contact_number: 'required|numeric',
        details: 'required|string',
        diseases: 'required|string',
        address: 'required|string',
        bed_number: 'required|numeric',
        room_number: 'required|numeric',
        department: 'required|in:Cardiology,Neurology, ENT, Ophthalmologist, Anesthesiologist,Dermatologist,Oncologist,Psychiatrist',
        doctor: 'required|string',
        patient_blood_group: 'required|in:A+, A-, B+, B-, AB+, AB-, O+, O-',
        password: 'required|string|min:8|max:15'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { name, age, email, date, gender, dateOfBirth, contact_number, details, diseases, address, bed_number, room_number, department, doctor, patient_blood_group, password } = req.body;

        const authUser = req.user;
        if (authUser.role != 'nurse') {
            return RESPONSE.error(res, 1205)
        }

        const patient = await Patient.create({ name, age, email, date, gender, dateOfBirth, contact_number, details, diseases, address, bed_number, room_number, department, doctor, patient_blood_group, password })

        const updatedBed = await Beds.findOneAndUpdate(
            { bed_number },
            { $set: { is_available: 'unavailable' } }
        );

        if (!updatedBed) {
            return RESPONSE.error(res, 'Bed not found or unavailable');
        }
        return RESPONSE.success(res, 1301, patient)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//.................get all beds...
const getAllBeds = async (req, res) => {
    try {
        const authUser = req.user;
        if (authUser.role !== 'nurse') {
            return RESPONSE.error(res, 1205);
        }

        const beds = await Beds.find();
        if (!beds) {
            return RESPONSE.error(res, 1603);
        }
        const data = await Beds.aggregate([
            {
                $lookup: {
                    from: "patients",
                    let: { bedNumber: "$bed_number", roomNumber: "$room_number" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$bed_number", "$$bedNumber"] },
                                        { $eq: ["$room_number", "$$roomNumber"] }
                                    ]
                                },
                                discharge: true
                            }
                        }
                    ],
                    as: "patient_detail"
                }
            }
        ]);



        return RESPONSE.success(res, 1604, data);
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


// const getAllBeds = async (req, res) => {
//     try {
//         const authUser = req.user;
//         if (authUser.role !== 'nurse') {
//             return RESPONSE.error(res, 1205);
//         }

//         const beds = await Beds.aggregate([
//             {
//                 $lookup: {
//                     from: "patients",
//                     localField: "bed_number",
//                     foreignField: "bed_number",
//                     as: "patient_detail"
//                 }
//             }
//         ]).exec();

//         if (!beds) {
//             return RESPONSE.error(res, 1603);
//         }

//         return RESPONSE.success(res, 1604, beds);
//     } catch (error) {
//         console.log(error);
//         return RESPONSE.error(res, 9999);
//     }
// }




//..........................book appointment..................
const bookAppointment = async (req, res) => {
    let validation = new Validator(req.body, {
        patient_name: 'required|string',
        age: 'required|numeric',
        gender: 'required|in:male,female,other',
        contact_number: 'required|numeric',
        email: 'required|email',
        type_of_diseases: 'required',
        address: 'required',
        department: 'required|in:Cardiology,Neurology, ENT, Ophthalmologist, Anesthesiologist,Dermatologist,Oncologist,Psychiatrist',

    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { patient_name, age, gender, contact_number, email, type_of_diseases, address, department } = req.body;

        const authUser = req.user;
        if (authUser.role != 'nurse') {
            return RESPONSE.error(res, 1205)
        }

        const appointment = await Appointment.create({ patient_name, age, gender, contact_number, email, type_of_diseases, address, department })

        return RESPONSE.success(res, 1801, appointment)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }

}


module.exports = {
    getProfile,
    updateProfile,
    addPatients,
    getAllBeds,
    bookAppointment
}