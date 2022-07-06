const argon2 = require("argon2");

module.exports = () => {
  async function hash(password) {
    return await argon2.hash(password);
  }

  async function verify(password, userPassword) {
    return await argon2.verify(password, userPassword);
  }

  return {
    hash: hash,
    verify: verify,
  };
};
