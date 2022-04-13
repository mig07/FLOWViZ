const toolContract = require('./schema/library-schema.json');

module.exports = (service, validator) => {
    
    function getLibraries(req, res, next) {
        service.getLibraries()
            .then(data => {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => {
                if (err) {
                    next(err)
                }
            })        
    }

    function getLibrary(req, res) {
        const libraryName = req.params.name;
        service.getLibrary(libraryName)
            .then(data => {                
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => {
                if (err) {
                    next(err)
                }
            })        
    }

    function addLibrary(req, res) {
        const isContractValid = validator.isValid(
            JSON.stringify(req.body),
            toolContract
        )

        if (!isContractValid) {
            res.statusCode = 400
            res.end("This library contract is not valid!")
            return
        }

        service.addLibrary(req.body)
            .then(data => {
                res.statusCode = 201
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => {
                if (err) {
                    next(err)
                }
            })        
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}