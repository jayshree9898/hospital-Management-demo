const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('../config/config')

//..............models.................
const User = require('../models/user.model');
const UserSession = require('../models/userSession.model');
const admin = require('../models/admin.model');


//.............................addUser...................
const addUser = async (req, res) => {
    let validation = new Validator(req.body, {
        username: 'required|string',
        password: 'required|min:8|max:15'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { username, password } = req.body;

        const isExistUser = await User.findOne({ username: username });

        if (isExistUser) {
            return RESPONSE.error(res, 1004)
        }

        const user = await User.create({ username, password })

        const token = jwt.sign({ username, user_id: user._id }, config.jwt_secret_key, { expiresIn: '1h' });

        const session = await UserSession.create({ user_id: user._id, token })

        return RESPONSE.success(res, 1001, user)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//..................................get user by username..........................
const getUserByUsername = async (req, res) => {
    let validation = new Validator(req.body, {
        username: 'required',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { username } = req.body;

        const findUser = await User.findOne({ username: username }, '-password');
        if (!findUser) {
            return RESPONSE.error(res, 1005)
        }

        return RESPONSE.success(res, 1008, findUser)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//.........................................get user by id..........................
const getUserById = async (req, res) => {
    let validation = new Validator(req.body, {
        id: 'required',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { id } = req.body;

        const findUser = await User.findOne({ _id: id }, '-password');
        if (!findUser) {
            return RESPONSE.error(res, 1005)
        }

        return RESPONSE.success(res, 1008, findUser)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//....................login........................
const login = async (req, res) => {
    let validation = new Validator(req.body, {
        username: 'required',
        password: 'required'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { username, password } = req.body;

        const findUser = await admin.findOne({ username: username });
        if (!findUser) {
            return RESPONSE.error(res, 1005)
        }

        const isPasswordMatch = await bcrypt.compare(password, findUser.password);

        if (!isPasswordMatch) {
            return RESPONSE.error(res, 1006);
        }

        const token = jwt.sign({ username, user_id: findUser._id }, config.jwt_secret_key);

        const session = await UserSession.create({ user_id: findUser._id, token })

        return RESPONSE.success(res, 1002)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//....................................logout user..............................
const logout = async (req, res) => {
    try {
        const authUser = req.user;

        await UserSession.deleteOne({ user_id: authUser._id });

        return RESPONSE.success(res, 1003)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}
module.exports = {
    addUser,
    getUserByUsername,
    getUserById,
    login,
    logout
}

