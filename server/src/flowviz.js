/**
 * A configurator module to expose the framework, when using it as a npm package.
 * @param {JSON object to insert previously created objects required for the
 * phylogenetic tool and FLOWViZ (e.g. dependencies, middlewares, ...)} config
 */
module.exports = (config) => {
  require(`dotenv`).config();
  var conf = config || {};

  const path = require("node:path");
  const production = false;

  const express = conf.express || require("express");
  const app = conf.app || express();
  const router = express.Router();
  const passport = conf.authenticator || require("passport");
  const compression = require("compression");

  /* Server config */
  const accessConfig = require("./config/dev-config.json");
  const dbConfig = accessConfig.dataSource;

  // Defining API route prefix
  app.use("/flowapi", router);

  /* Dependencies */
  const bodyParser = conf.bodyParser || require("body-parser");
  const morgan = conf.morgan || require("morgan");
  const cors = conf.cors || require("cors");
  const mongoose = conf.mongoose || require("mongoose");

  /* Utilities */

  /* Creating connection with MongoDB */
  mongoose.connect(`mongodb://${dbConfig.address}:${dbConfig.port}`, {
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

  // If no authenticator module was specified, use the one included.
  if (!conf.authenticator) {
    require("./auth/passport")(router, passport);
  }

  /* Loading FLOWViZ modules */
  require("./modules")(router, accessConfig, passport, production);

  /* Server initialization */
  if (!conf.express) {
    const serverConfig = accessConfig.server;
    const port = serverConfig.port;
    app.listen(port, (err) => {
      console.log(`Booting ${serverConfig.name}...`);
      if (err) {
        console.log("Error!", err);
      }
      console.log(`Listening to port ${port}`);
    });
  }
};
