const dbobj = require('../config/db.config')

if(!global.ASSETS)
    global.ASSETS = require('./assets')

if(!global.RESPONSE)
   global.RESPONSE = require('./response')

if(!global.FILEACTION)
   global.FILEACTION = require('./file')