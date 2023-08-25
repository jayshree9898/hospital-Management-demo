const router = require('express').Router();


const AdminRouter = require('./admin.route');
const NurseRouter = require('./nurse.route');
const DoctorRouter = require('./doctor.route');

router.use('/', AdminRouter)
router.use('/', NurseRouter)
router.use('/', DoctorRouter)

module.exports = router