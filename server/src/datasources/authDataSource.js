const ApiException = require("../exceptions/apiException");
const UserModel = require("../models/mongodb/user/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport, secret) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  };

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      UserModel.findOne({ username: jwt_payload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }).select("-_id username");
    })
  );

  function register(user) {
    const u = new UserModel(user);
    return u
      .save()
      .then((data) => console.log(data))
      .catch((err) => {
        // MongoDb correspondent error for duplicate file.
        if (err.code === 11000) {
          throw ApiException.conflict(
            `The user with username '${user.username}' already exists.`
          );
        }
        throw err;
      });
  }

  function getUserByName(username) {
    return UserModel.findOne({ username: username })
      .then((dbUser) => {
        if (!dbUser) {
          throw ApiException.notFound(
            `The user with name '${username}' does not exist.`
          );
        }
        return dbUser;
      })
      .catch((err) => {
        throw err;
      });
  }

  return {
    register: register,
    getUserByName: getUserByName,
  };
};
