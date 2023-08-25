const MESSAGES = {
    // user controller
    '1001': 'add user  successfully!',
    '1002': 'Login successfully!',
    '1003': 'Logout successfully!',
    '1004': 'User already exist.',
    '1005': 'User not found.',
    '1006': 'Email or password are not match.',
    '1007': 'Email already exist.',
    '1008': 'Get user profile successfully.',
    '1009': 'Upadate user profile successfully.',
    '1010': 'Password does not match.',
    '1011': 'User Account deleted successfully.',
    '1012': 'you are not user',

    // Room controller
    '1101': 'Room create successfully!',
    '1102': 'room  get successfully!',
    '1103': 'Categories delete successfully!',
    '1104': 'room already exist',


    // nurse controller
    '1201': 'nurse add  successfully!',
    '1202': 'get profile successfully!',
    '1203': 'nurse profile delete successfully!',
    '1204': 'nurse already exist',
    '1205': 'you are not nurse',
    '1206': 'profile not found',
    '1207': 'update profile successfully..',

    // patients controller
    '1301': 'patients add successfully!',
    '1302': 'patients get successfully!',
    '1303': 'You are not admin!',
    '1304': 'product delete successfully',
    '1305': 'product uploded successfully',
    '1306': 'Please select product file..',
    '1307': 'patients not found',
    '1308': 'product update successfully',
    '1309': 'You are not active admin!',
    '1310': 'Add product reviews successfully',



    // admin controller

    '1401': 'Get admin successfully!',
    '1402': 'you are not admin',
    '1403': 'please signup now',
    '1404': 'add Admin successfully',
    '1405': 'admin already exist ',


    // doctor  controller
    '1501': 'add doctor successfully!',
    '1502': 'doctor already exist!',
    '1503': 'doctor not found',
    '1504': 'get doctor profile successfully',
    '1505': 'you are not doctor ',
    '1506': 'update doctor profile successfully.',

    // beds  controller
    '1601': 'add bed successfully!',
    '1602': 'bed already exist!',
    '1603': 'bed not found',
    '1604': 'bed get successfully! ',

    // ambulance  controller
    '1701': 'ambulance bed successfully!',
    '1702': 'ambulance already exist!',
    '1703': 'ambulance not found',

    // ambulance  controller
    '1801': 'book appointment successfully!',
    '1802': 'ambulance already exist!',
    '1803': 'ambulance not found',
    // Common
    '9000': 'Please Enter valid Details',
    '9999': "Something went wrong!",

}


module.exports.getMessage = function (messageCode) {
    if (isNaN(messageCode)) {
        return messageCode
    }

    return messageCode ? MESSAGES[messageCode] : '';
}