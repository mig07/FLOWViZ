const ApiException = require("../exceptions/apiException");

async function getOne(fetchFn, id, entityDesignation) {
  const entity = await fetchFn(id);

  if (!entity) {
    throw ApiException.notFound(
      `The ${entityDesignation} with value ${id} does not exist.`
    );
  }

  return entity;
}

module.exports = getOne;
