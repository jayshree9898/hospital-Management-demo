const router = require('express').Router();

const roomController = require('../conntroller/room.model');

const auth = require('../middleware/authapi');


router.post('/addroom', roomController.addroom);

router.get('/getrooms',roomController.getrooms)


module.exports = router