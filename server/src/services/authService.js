module.exports = (authDataSource) => {
  async function register(user) {
    return await authDataSource.register(user);
  }

  async function getUserByName(username) {
    return await authDataSource.getUserByName(username);
  }

  async function deleteUser(username) {
    return await authDateSource.deleteUser(username);
  }

  return {
    deleteUser: deleteUser,
    register: register,
    getUserByName: getUserByName,
  };
};
