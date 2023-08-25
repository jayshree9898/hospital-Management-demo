
const UserSession = require('../models/userSession.model');
const Admin = require('../models/admin.model');
const Doctor = require('../models/doctor.model');
const Nurse = require('../models/nurse.model');

const authUser = async (req, res, next) => {
    const headerToken = req.headers.authorization ? req.headers.authorization : null;
    const isAuth = await UserSession.findOne({ token: headerToken });

    if (isAuth != null) {

        if (isAuth.role == 'admin') {

            const admin = await Admin.findOne({ _id: isAuth.user_id }, { _id: 1 });

            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin not found',
                });
            }

            admin.role = 'admin';
            req.user = admin;
            next();
        } else if (isAuth.role == 'doctor') {
            const doctor = await Doctor.findOne({ _id: isAuth.user_id }, { _id: 1 });

            if (!doctor) {
                return res.status(401).json({
                    success: false,
                    message: 'Doctor not found',
                });
            }

            doctor.role = 'doctor';
            req.user = doctor;
            next();
        } else if (isAuth.role == 'nurse') {
            const nurse = await Nurse.findOne({ _id: isAuth.user_id }, { _id: 1 });

            if (!nurse) {
                return res.status(401).json({
                    success: false,
                    message: 'Nurse not found',
                });
            }

            nurse.role = 'nurse';
            req.user = nurse;
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user',
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Users.',
        });
    }
};

module.exports = {
    authUser,
};
