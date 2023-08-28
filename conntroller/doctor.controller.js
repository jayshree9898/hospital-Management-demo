const Validator = require('validatorjs');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

//...............................models.............
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');
const Beds = require('../models/beds.model');
const Report = require('../models/report.model');


//................get Doctor Profile.................
const getDoctorProfile = async (req, res) => {
    try {
        const authUser = req.user;
        if (authUser.role != 'doctor') {
            return RESPONSE.error(res, 1505)
        }

        const doctorData = await Doctor.findOne({ _id: authUser._id }, '-password');
        if (!doctorData) {
            return RESPONSE.error(res, 1503)
        }

        return RESPONSE.success(res, 1504, doctorData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}



//.......................update profile.................
const updateProfile = async (req, res) => {
    let validation = new Validator(req.body, {
        doctor_name: 'required|string',
        age: 'required|numeric',
        gender: 'required|in:male,female,other',
        blood_group: 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
        education: "required|string",
        emergency_number: 'required|min:10|max:12'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const { doctor_name, age, gender, blood_group, education, emergency_number } = req.body;

        const authUser = req.user;
        if (authUser.role != 'doctor') {
            return RESPONSE.error(res, 1505)
        }

        const findDoctor = await Doctor.findOne({ _id: authUser._id }, '-password');
        if (!findDoctor) {
            return RESPONSE.error(res, 1503)
        }

        const updateData = await Doctor.updateOne({ doctor_name, age, gender, blood_group, education, emergency_number });
        return RESPONSE.success(res, 1506, updateData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//.........................get patient details.............
const getPatientDetails = async (req, res) => {
    try {

        const { page, limit } = req.query;

        const authUser = req.user;
        if (authUser.role !== 'doctor') {
            return RESPONSE.error(res, 1205);
        }

        const patientDetails = await Patient.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)

        if (!patientDetails) {
            return RESPONSE.error(res, 1307)
        }

        return RESPONSE.success(res, 1302, patientDetails)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//.........................get all beds..................
const getAllBeds = async (req, res) => {
    try {
        const authUser = req.user;
        if (authUser.role !== 'doctor') {
            return RESPONSE.error(res, 1505);
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
                                discharge: false
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
        return RESPONSE.error(res, 9999);
    }
}

//............................create report............................
const createReport = async (req, res) => {
    let validation = new Validator(req.body, {
        doctor_name: 'required|string',
        department: 'required|in:Cardiology,Neurology,ENT,Ophthalmologist,Anesthesiologist,Dermatologist,Oncologist,Psychiatrist',
        doctor_no: 'required:min:10|max:12',
        patient_name: 'required|string',
        patient_age: 'required|numeric',
        patient_contact_number: 'required:min:10|max:12',
        patient_gender: 'required|in:male,female,other',
        patient_diseases: 'required|string',
        patient_blood_group: 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
        patient_temperature: 'required|string',
        patient_weight: 'required|string',
        patient_BP: 'required|string',
        patient_glucose: 'required|string',
        medicines: 'required|array',
        'medicines.*.medicines_name': 'required',
        'medicines.*.duration': 'required|in:after meal,before meal',
        'medicines.*.medicines_dosage': 'required|in:1,2,3',  //...............1= morning  2=after  3= evening
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const { doctor_name, department, patient_glucose, doctor_no, patient_name, patient_age, patient_contact_number, patient_gender, patient_diseases, patient_blood_group, patient_temperature, patient_weight, patient_BP } = req.body;
        const date = Date.now;
        const time = Date.now;
        const authUser = req.user;
        if (authUser.role !== 'doctor') {
            return RESPONSE.error(res, 1505);
        }
        const reportData = await Report.create({ doctor_name, department, doctor_no, patient_name, patient_age, patient_contact_number, patient_gender, patient_diseases, patient_glucose, patient_blood_group, patient_temperature, patient_weight, patient_BP, date, time });
        return RESPONSE.success(res, 1507, reportData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}
module.exports = {
    getDoctorProfile,
    getPatientDetails,
    updateProfile,
    getAllBeds,
    createReport
}