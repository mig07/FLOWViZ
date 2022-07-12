const ApiException = require("../exception/apiException");
const onSuccess = require("./controllerUtils");

module.exports = (jwt, authService, argonUtils, secret) => {
  function register(req, res, next) {
    /**
     * For security reasons, it is preferred to hash the password
     * here and create the user here, instead of propagate it until mongoose
     * 'pre' middleware.
     */
    argonUtils
      .hash(req.body.password)
      .then((hashedPassword) => {
        // Registering after password hashing
        const user = {
          username: req.body.username,
          password: hashedPassword,
        };

        authService
          .register(user)
          .then((data) =>
            onSuccess(
              res,
              { jwt: jwt.sign({ id: user.username }, secret) },
              (code = 201)
            )
          )
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => next(err));
  }

  function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    authService
      .getUserByName(username)
      .then((dbUser) =>
        // Again, the passed password does not get propagated any further.
        argonUtils
          .verify(dbUser.password, password)
          .then((isValid) => {
            if (!isValid) {
              throw ApiException.unauthorized("Wrong password.");
            }
          })
          .catch((err) => {
            throw err;
          })
      )
      .then(() => {
        // The user is authentic, the jwt is signed and returned to the client.
        onSuccess(
          res,
          { jwt: jwt.sign({ id: username }, secret) },
          (code = 201)
        );
      })
      .catch((err) => next(err));
  }

  function logout(req, res, next) {
    req.logout();
  }

  return {
    register: register,
    login: login,
    logout: logout,
  };
};
