const ToolContract = require('../schema/library-schema.json');
const ApiException = require('../exception/apiException')

module.exports = (service, validator) => {
    
    function getLibraries(req, res, next) {

        service.getLibraries()
            .then(data => {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => next(err))        
    }

    function getLibrary(req, res, next) {

        const libraryName = req.params.name;

        service.getLibrary(libraryName)
            .then(data => {                
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => next(err))       
    }

    function addLibrary(req, res, next) {        

        const body = req.body    

        if (!isContractValid(body)) {
            next(ApiException.badRequest("This library contract is not valid!"))
        }
        
        service.addLibrary(body)
            .then(data => {
                res.statusCode = 201
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => next(err))                
    }

    function isContractValid(body) {
        return validator.isValid(JSON.stringify(body), ToolContract)
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}