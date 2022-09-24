/**
 * A configurator module to expose the framework, when using it as a npm package.
 * @param {JSON object to insert previously created objects required for the
 * phylogenetic tool and FLOWViZ integration.} config
 */
module.exports = (config) => {
  require(`dotenv`).config();

  const conf = config || {};

  const airflow = {
    address: process.env.AIRFLOW_ADDRESS,
    port: process.env.AIRFLOW_PORT,
    username: process.env.AIRFLOW_USERNAME,
    password: process.env.AIRFLOW_PASSWORD,
    dagGenerator: process.env.AIRFLOW_DAG_GENERATOR,
  };

  const production = process.env.PRODUCTION || false;

  /* Dependencies */
  const express = conf.express || require("express");
  const app = conf.app || express();
  const router = express.Router(); // New Router for FLOWViZ
  const bodyParser = conf.bodyParser || require("body-parser");
  const cors = conf.cors || require("cors");
  const mongoose = conf.mongoose || require("mongoose");
  const passport = conf.authenticator || require("passport");
  const compression = conf.compression || require("compression");
  const morgan = conf.morgan || require("morgan");
  const path = conf.path || require("node:path");

  /* Database config */
  const databaseAddr = process.env.DATABASE_ADDRESS;
  const databasePort = process.env.DATABASE_PORT;

  // Defining API route prefix
  app.use("/flowapi", router);

  /* Creating connection with MongoDB */
  mongoose.connect(`mongodb://${databaseAddr}:${databasePort}`, {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));

  /* Initializing express server */

  // FLOWViZ required express middlewares
  router.use(cors());
  router.use(express.json());
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(morgan("dev"));
  app.use(compression());

  // Uses client build version if in production
  if (production) {
    const buildDirectory = "../../client/build";
    app.use(express.static(path.join(__dirname, buildDirectory)));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, `${buildDirectory}/index.html`));
    });
  }

  // If no authenticator module was specified, use the included one.
  if (!conf.authenticator) {
    require("./auth/passport")(router, passport);
  }

  /* Loading FLOWViZ modules */
  require("./modules")(router, airflow, passport, production);

  /* Server initialization */
  if (!conf.express) {
    const port = process.env.SERVER_PORT;
    app.listen(port, (err) => {
      console.log(`Booting ${process.env.SERVER_NAME}...`);
      if (err) {
        console.log("Error!", err);
      }
      console.log(`Listening to port ${port}`);
    });
  }
};
