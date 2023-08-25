const router = require('express').Router();

const nurseController = require('../conntroller/nurse.controller');

//......................middleware...................
const auth = require('../middleware/authapi');

//............................routes.....................


router.get('/get-profile', auth.authUser, nurseController.getProfile);

router.patch('/update-profile',auth.authUser,nurseController.updateProfile);

router.post('/add-patient',auth.authUser,nurseController.addPatients);

router.get('/get-all-beds-nurse',auth.authUser,nurseController.getAllBeds);

router.get('/get-patient-details',auth.authUser,nurseController.getPatientDetails);

router.post('/book-appointment',auth.authUser,nurseController.bookAppointment);

module.exports = router