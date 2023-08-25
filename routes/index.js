const router = require('express').Router();

const UserRouter = require('./user.route');
const RoomRouter = require('./room.route');
const AdminRouter = require('./admin.route');
const NurseRouter = require('./nurse.route');

// router.use('/', UserRouter)
// router.use('/', RoomRouter)
router.use('/', AdminRouter)
router.use('/', NurseRouter)

module.exports = router