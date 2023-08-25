const message = require('../lang/message')


module.exports.success = function(res,messageCode = null,data= null){
    let response = {}
    response.success = true;
    response.message = message.getMessage(messageCode);
    response.data = data;
    return res.json(response);
}



module.exports.error = function(res,messageCode, error = "", statuscode = 422){
    let response = {};
    response.error = false;
    response.message = message.getMessage(messageCode);

    if (error != "") {
        response.error = error
    }
    statuscode = (messageCode == 9999) ? 500 : statuscode;
    return res.status(statuscode).json(response)
}