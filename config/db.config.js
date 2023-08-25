const mongoose = require('mongoose')
const config = require('./config')

const dbConnection = async () => {
    try {
        await mongoose.connect(config.db_url), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        console.log("database connect successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConnection
}