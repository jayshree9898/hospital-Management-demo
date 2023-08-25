const router = require('express').Router();

const doctorController = require('../conntroller/doctor.controller');

//......................middleware...................
const auth = require('../middleware/authapi');

//............................routes.....................


router.get('/get-doctor-profile', auth.authUser,doctorController.getDoctorProfile);

router.get('/get-patients-details',auth.authUser,doctorController.getPatientDetails);

router.get('/get-all-beds-by-doctor',auth.authUser,doctorController.getAllBeds)

router.patch('/update-doctor-profile',auth.authUser,doctorController.updateProfile);
module.exports = router