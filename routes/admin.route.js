const router = require('express').Router();

const AdminController = require('../conntroller/admin.controller');

//......................middleware...................
const auth = require('../middleware/authapi');

//............................routes.....................

router.post('/add-admin',AdminController.addAdmin);

router.post('/add-doctor', auth.authUser, AdminController.addDoctor);

router.post('/add-nurse', auth.authUser, AdminController.addNurse);

router.post('/add-bed',auth.authUser,AdminController.addBeds);

router.post('/add-ambulance',auth.authUser,AdminController.addAmbulance);

router.get('/get-all-beds',auth.authUser,AdminController.getAllBeds);

router.post('/login',AdminController.login);

router.delete('/logout',auth.authUser,AdminController.logout)

module.exports = router