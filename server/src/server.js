require(`dotenv`).config({ path: "./.env" });

/* Server config */
const config = require("./config/flowviz-server-dev-config.json");
const serverConfig = config.server;
const dbConfig = config.dataSource;
const dev = config.dev;
const port = serverConfig.port;

/* Libraries */
const express = require("express");
const bodyParser = require("body-parser");
const { expressjwt: ejwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

/* Api exception custom object */
const ApiException = require("./exception/apiException");

/* Connecting to MongoDB */
mongoose.connect(`mongodb://${dbConfig.address}:${dbConfig.port}`, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

/* Initializing express server */
const app = express();

/* JWT Secret */
const secret = process.env.JWT_SECRET;

/* Cross-Origin Request */
app.use(cors());

/* Express middleware config */
const exceptionMiddleware = require("./middleware/exceptionMiddleware")(dev);
const workflowMiddleware = require("./middleware/workflowValidationMiddleware");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

app.use(
  ejwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "token",
  }).unless({ path: ["/login", "/register"] }),
  (err, req, res, next) => {
    if (err.status === 401) {
      next(
        ApiException.unauthorized("Not authorized to access this resource.")
      );
    }
  }
);

const rabbitmq = require("amqplib/callback_api");
const { path } = require("./schema/toolContract/Api");

/* Server modules */

// Auth
const authUtils = require("./authUtils")();

const authDs = require("./datasource/authDataSource")();
const authService = require("./service/authService")(authDs);
const authController = require("./controller/authController")(
  jwt,
  authService,
  authUtils,
  secret
);

// Library
const toolDb = require("./datasource/toolDbDataSource.js")();
const toolService = require("./service/toolService.js")(toolDb, ApiException);
const toolController = require("./controller/toolController.js")(toolService);

// Workflow
const workflowDb = require("./datasource/workflowDbDataSource.js")(rabbitmq);
const workflowService = require("./service/workflowService.js")(
  workflowDb,
  ApiException
);
const workflowController = require("./controller/workflowController")(
  workflowService
);

// API's endpoints
require("./routes.js")(
  app,
  toolController,
  workflowController,
  authController,
  exceptionMiddleware,
  workflowMiddleware
);

/* Server initialization */
app.listen(port, (err) => {
  console.log(`Booting ${serverConfig.name}...`);
  if (err) {
    console.log("Error!", err);
  }
  console.log(`Listening to port ${port}`);
});
