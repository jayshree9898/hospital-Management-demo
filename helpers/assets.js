require('dotenv').config();

function getProfileURL(folderName, fileName) {
    if (typeof fileName == 'undefined' || fileName == null) {
        return null;
    };
    return process.env.APP_PROJECT_PATH + `/images/${folderName}/` + fileName;

}

module.exports = {
    getProfileURL,
};