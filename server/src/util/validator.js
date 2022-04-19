exports.isValid = (input, schema) => {
    const Validator = require('jsonschema').Validator;
    const validator = new Validator();
    const instance = input
    const librarySchema = schema
    const res = validator.validate(instance, librarySchema)
    return res.valid
}