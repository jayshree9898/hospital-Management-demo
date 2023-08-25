const Validator = require('validatorjs');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

//...............................models.............
const Doctor = require('../models/doctor.model');
const UserSession = require('../models/userSession.model');
const Nurse = require('../models/nurse.model');
const Admin = require('../models/admin.model');
const Beds = require('../models/beds.model');
const Ambulance = require('../models/ambulance.model');


//......................add admin...........................
const addAdmin = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string',
        age: 'required|numeric',
        contact_number: 'required|numeric',
        email: 'required|email',
        gender: 'required|in:male,female,other',
        birthdate: 'required|date',
        address: 'required|string',
        education: 'required|string',
        password: 'required:min:8|max:15',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { name, age, contact_number, email, gender, birthdate, address, education, password } = req.body;

        const isExist = await Admin.findOne({ email });
        if (isExist) {
            return RESPONSE.error(res, 1405)
        }

        const adminData = await Admin.create({ name, age, contact_number, email, gender, birthdate, address, education, password })

        return RESPONSE.success(res, 1404, adminData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//....................add doctor by admin..............
const addDoctor = async (req, res) => {
    let validation = new Validator(req.body, {
        doctor_name: 'required|string',
        age: 'required|numeric',
        emergency_number: 'required|numeric',
        email: 'required|email',
        gender: 'required|in:male,female,other',
        blood_group: 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
        birthdate: 'required|date',
        address: 'required|string',
        education: 'required|string',
        department: 'required|string',
        password: 'required:min:8|max:15',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { doctor_name, age, emergency_number, email, gender, blood_group, birthdate, address, education, department, password } = req.body;

        const authUser = req.user;
        if (authUser.role != 'admin') {
            return RESPONSE.error(res, 1402)
        }

        const isExist = await Doctor.findOne({ email });
        if (isExist) {
            return RESPONSE.error(res, 1502)
        }

        const doctorData = await Doctor.create({ doctor_name, age, emergency_number, email, gender, blood_group, birthdate, address, education, department, password });

        return RESPONSE.success(res, 1501, doctorData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//....................add nurse by admin..............
const addNurse = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string',
        age: 'required|numeric',
        contact_number: 'required|numeric',
        email: 'required|email',
        gender: 'required|in:male,female,other',
        blood_group: 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
        birthdate: 'required|date',
        address: 'required|string',
        education: 'required|string',
        password: 'required:min:8|max:15',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { name, age, contact_number, email, gender, blood_group, birthdate, address, education, password, other_info } = req.body;

        const authUser = req.user;
        if (authUser.role != 'admin') {
            return RESPONSE.error(res, 1402)
        }

        const isExist = await Nurse.findOne({ email });
        if (isExist) {
            return RESPONSE.error(res, 1506)
        }

        const nurseData = await Nurse.create({ name, age, contact_number, email, gender, blood_group, birthdate, address, education, password, other_info });

        return RESPONSE.success(res, 1201, nurseData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//........................add beds..........................//
const addBeds = async (req, res) => {
    let validation = new Validator(req.body, {
        bed_number: 'required|numeric',
        room_number: 'required|numeric',

    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { bed_number, room_number } = req.body;

        const authUser = req.user;
        if (authUser.role != 'admin') {
            return RESPONSE.error(res, 1402)
        }

        const bedData = await Beds.create({ bed_number, room_number });

        return RESPONSE.success(res, 1601, bedData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//....................add Ambulance...............................//
const addAmbulance = async (req, res) => {
    let validation = new Validator(req.body, {
        ambulance_type: 'required|string',
        price_per_hours: 'required|numeric',
        ambulance_code: 'required',
        driver_name: 'required|string',
        driver_contact_no: 'required|min:10|max:12'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { ambulance_type, price_per_hours, ambulance_code, driver_name, driver_contact_no } = req.body;
        const isExist = await Ambulance.findOne({ ambulance_code });
        if (isExist) {
            return RESPONSE.error(res, 1702)
        }

        const ambulanceData = await Ambulance.create({ ambulance_type, price_per_hours, ambulance_code, driver_name, driver_contact_no })

        return RESPONSE.success(res, 1701, ambulanceData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//..........................get All Beds............................
const getAllBeds = async (req, res) => {
    try {
        const authUser = req.user;
        if (authUser.role != 'admin') {
            return RESPONSE.error(res, 1402)
        }
        const findBed = await Beds.find();

        if (!findBed) {
            return RESPONSE.error(res, 1603)
        }

        return RESPONSE.success(res, 1604, findBed)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//.....................login All...........................//
const login = async (req, res) => {
    let validation = new Validator(req.body, {
        email: 'required',
        password: 'required',
        role: 'required|in:1,2,3' // 1 = admin, 2= doctor, 3 = nurse
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        let { email, password, role } = req.body;

        if (role === '1') {

            const findAdmin = await Admin.findOne({ email: email });
            if (!findAdmin) {
                return RESPONSE.error(res, 1403);
            }

            const isPasswordMatch = await bcrypt.compare(password, findAdmin.password);
            if (!isPasswordMatch) {
                return RESPONSE.error(res, 1006);
            }

            role = "admin"
            const token = jwt.sign({ email, user_id: findAdmin._id }, config.jwt_secret_key);
            const session = await UserSession.create({ user_id: findAdmin._id, role: role, token });

            return RESPONSE.success(res, 1002)

        } else if (role === '2') {

            const findDoctor = await Doctor.findOne({ email: email })
            if (!findDoctor) {
                return RESPONSE.error(res, 1403);
            }

            const isPasswordMatch = await bcrypt.compare(password, findDoctor.password);
            if (!isPasswordMatch) {
                return RESPONSE.error(res, 1006);
            }

            role = "doctor"
            const token = jwt.sign({ email, user_id: findDoctor._id }, config.jwt_secret_key);
            const session = await UserSession.create({ user_id: findDoctor._id, role: role, token });

            return RESPONSE.success(res, 1002)

        } else if (role === '3') {

            const findNurse = await Nurse.findOne({ email: email })
            if (!findNurse) {
                return RESPONSE.error(res, 1403);
            }

            const isPasswordMatch = await bcrypt.compare(password, findNurse.password);
            if (!isPasswordMatch) {
                return RESPONSE.error(res, 1006);
            }

            role = "nurse"
            const token = jwt.sign({ email, user_id: findNurse._id }, config.jwt_secret_key);
            const session = await UserSession.create({ user_id: findNurse._id, role: role, token });

            return RESPONSE.success(res, 1002)
        } else {
            return RESPONSE.error(res, 9999)
        }

    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//......................logOut..........................//

const logout = async (req, res) => {
    try {
        const authUser = req.user;

        await UserSession.deleteOne({ user_id: authUser._id });

        return RESPONSE.success(res, 1003);
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999);
    }
}


module.exports = {
    addDoctor,
    addNurse,
    addAdmin,
    addBeds,
    addAmbulance,
    getAllBeds,
    logout,
    login
}