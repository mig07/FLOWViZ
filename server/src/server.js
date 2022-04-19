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
const validator = require('./util/validator.js')

/* Server custom exception object */
const ApiException = require('./exception/apiException');

/* Server modules */

// Library
const libraryDb = require('./datasource/libraryDbDataSource.js')(config.dataSource, fetch)
const libraryService = require('./service/libraryService.js')(libraryDb, validator, ApiException)
const libraryController = require('./controller/libraryController.js')(libraryService)

// Workflow
const workflowDb = require('./datasource/workflowDbDataSource.js')(fetch)
const workflowService = require('./service/workflowService.js')(workflowDb, validator, ApiException)
const workflowController = require('./controller/workflowController')(workflowService);

// API's endpoints
require('./routes.js')(app, libraryController, workflowController)

/* Server initialization */
app.listen(port, (err) => {
  console.log(`Booting ${serverConfig.name}...`)  
  if (err) {
    console.log("Error!", err)
  }
  console.log(`Listening to port ${port}`)
})