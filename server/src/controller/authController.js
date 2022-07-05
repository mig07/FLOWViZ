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
          .then((data) => onSuccess(res, data, (code = 201)))
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => next(err));
  }

  function login(req, res, next) {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };

    authService
      .login(user)
      .then(() => {
        onSuccess(
          res,
          res.json({ jwt: jwt.sign({ id: user.username }, secret) }),
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
