module.exports = (authDataSource) => {
  async function register(user) {
    return await authDataSource.register(user);
  }

  async function login(user) {
    return await authDataSource.login(user);
  }

  return {
    register: register,
    login: login,
  };
};
