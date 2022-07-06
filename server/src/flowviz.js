/**
 *
 * @param {The server router (e.g. Express Router)} router
 * @param {The session / account authenticator (e.g. Passport)} authenticator
 */
module.exports = (router, authenticator) => {
  require(`dotenv`).config();

  var app = router;
  var passport = authenticator;

  /* Server config */
  const config = require("./config/flowviz-server-dev-config.json");
  const dbConfig = config.dataSource;
  const dev = config.dev;

  /* Dependencies */
  const express = require("express");
  const bodyParser = require("body-parser");
  const morgan = require("morgan");
  const cors = require("cors");
  const mongoose = require("mongoose");

  /* Creating connection with MongoDB */
  mongoose.connect(`mongodb://${dbConfig.address}:${dbConfig.port}`, {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));

  /* Initializing express server */

  // If the express router was not specified
  if (!router) {
    app = express();
  }

  // FLOWViZ required express middlewares
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(morgan("dev"));

  // If no authenticator module was specified, use the one included.
  if (!authenticator) {
    passport = require("passport");
    require("./auth/passport")(app, passport);
  }

  /* Loading FLOWViZ modules */
  require("./modules")(app, dev);

  /* Server initialization */
  if (!router) {
    const serverConfig = config.server;
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
