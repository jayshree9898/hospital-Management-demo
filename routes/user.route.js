const router = require('express').Router();

//....................models..............
const userController = require('../conntroller/user.controller');
const patientsController = require('../conntroller/patients.controller')

//..........................middleware......................
const auth = require('../middleware/authapi');


//.............................routes.....................

//............................user.........................
router.post('/add-user',userController.addUser);

router.get('/getUserByUsername',userController.getUserByUsername);

router.get('/getUserById',userController.getUserById);

router.post('/login',userController.login)

router.delete('/logout',auth.authUser,userController.logout);


//.......................patients....................

router.post('/addpatient',patientsController.addpatient);

router.get('/getpatients',patientsController.getpatients);

router.get('/getpatient',patientsController.getpatient);




module.exports = router