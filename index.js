
const express = require('express')
const app = express()
const config = require('./config/db.config')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs');
require('./helpers/global')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: "50mb" }))



//.................call database connection function.....
config.dbConnection()

//......................router.............
const router = require('./routes/index');
app.use('/api/v1/', router)

//.................create Server..................
let server
if (config.protocol == "https") {
    const https = require('https')
    const options = {
        key: fs.readFileSync(config.sslCertificates.privkey),
        cert: fs.readFileSync(config.sslCertificates.fullchain)
    }
    server = https.createServer(options, app)
} else {
    const http = require('http')
    server = http.createServer(app)
}

app.get('/', (req, res) => {
    res.send("welcome")
})

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server running on port ${port}`);
})

