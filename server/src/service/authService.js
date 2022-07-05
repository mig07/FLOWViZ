module.exports = (authDataSource) => {
  async function register(user) {
    return await authDataSource.register(user);
  }

  async function getUserByName(username) {
    return await authDataSource.getUserByName(username);
  }

  return {
    register: register,
    getUserByName: getUserByName,
  };
};
