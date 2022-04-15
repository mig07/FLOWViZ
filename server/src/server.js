/* Server config */
const config = require('./config/flowviz-server-dev-config.json')
const serverConfig = config.server
const port = serverConfig.port

/* Libraries */
const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const morgan = require('morgan')
const cors = require('cors')

/* Initializing express server */
const app = express()

/* Cross-Origin Request */
app.use(cors())

/* Express middleware config */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

/* Validator for JSON contracts */
const validator = require('./util/library-validator.js')()

/* Server modules */
const libraryDb = require('./datasource/libraryDbDataSource.js')(config.dataSource, fetch)
const service = require('./service/libraryService.js')(libraryDb)
const controller = require('./controller.js')(service, validator)
const endpoints = require('./routes.js')(app, controller)

/* Server initialization */
app.listen(port, (err) => {
  console.log(`Booting ${serverConfig.name}...`)  
  if (err) {
    console.log("Error!", err)
  }
  console.log(`Listening to port ${port}`)
})