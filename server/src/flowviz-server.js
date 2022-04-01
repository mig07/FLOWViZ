// Server config
const config = require('./flowviz-server-dev-config.json')
const serverConfig = config.server

// Libraries
const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const libraryValidator = require('./util/library-validator');
const cors = require('cors')

// Initializing express server
const app = express()

// Cross-Origin Request
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Validator for JSON contracts
const validator = require('./util/library-validator.js')()

// Initializing server modules
const libraryDb = require('./flowviz-libraryDb.js')(config.dataSource, fetch)
const service = require('./flowviz-service.js')(libraryDb)
const controller = require('./flowviz-controller.js')(service, validator)
const endpoints = require('./flowviz-endpoints.js')(app, controller)

const port = serverConfig.port

app.listen(port, (err) => {
  console.log(`Booting ${serverConfig.name}...`)
  if (err) {
      console.log("Error!", err)
  }
  console.log(`Listening to port ${port}`)
})