module.exports = (service) => {
    
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

        const library = req.body    
        
        service.addLibrary(library)
            .then(data => {
                res.statusCode = 201
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => next(err))                
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}