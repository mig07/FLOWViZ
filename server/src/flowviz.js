/**
 * A configurator module to expose the framework, when using it as a npm package.
 * @param {JSON object to insert previously created objects required for the
 * phylogenetic tool and FLOWViZ (e.g. dependencies, middlewares, ...)} config
 */
module.exports = (config) => {
  require(`dotenv`).config();
  var conf = config || {};

  var express = conf.express || require("express");
  var app = conf.router || express();
  var passport = conf.authenticator || require("passport");

  /* Server config */
  const accessConfig = require("./config/flowviz-server-dev-config.json");
  const dbConfig = accessConfig.dataSource;
  const dev = accessConfig.dev;

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
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan("dev"));

  // If no authenticator module was specified, use the one included.
  if (!conf.authenticator) {
    require("./auth/passport")(app, passport);
  }

  /* Loading FLOWViZ modules */
  require("./modules")(app, accessConfig, passport);

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
