const ApiException = require("../exception/apiException");
const UserModel = require("../schema/user/user");
const argon2 = require("argon2");

module.exports = () => {
  function register(user) {
    const u = new UserModel(user);
    return u
      .save()
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.code === 11000) {
          throw ApiException.conflict(
            `The user with username '${user.username}' already exists.`
          );
        }
        throw err;
      });
  }

  function login(user) {
    const name = user.username;
    return UserModel.findOne({ username: name })
      .then((dbUser) => {
        return argon2
          .verify(dbUser.password, user.password)
          .then((isValid) => {
            if (!isValid) {
              throw ApiException.unauthorized("Wrong password.");
            }
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  return {
    register: register,
    login: login,
  };
};
