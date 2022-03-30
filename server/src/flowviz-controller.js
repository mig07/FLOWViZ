module.exports = (service) => {
    
    function getLibraries(req, res) {
        service.getLibraries()
            .then(data => {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => {
                res.statusCode = err.number;
                res.end(err.message);
            })        
    }

    function getLibrary(req, res) {
        const libraryName = req.path.split("/")[2];
        service.getLibrary(libraryName)
            .then(data => {                
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => {
                res.statusCode = err.number;
                res.end(err.message);
            })        
    }

    function addLibrary(req, res) {
        
        service.addLibrary(req.body)
            .then(data => {
                res.statusCode = 201
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => {
                res.statusCode = err.number;
                res.end(err.message);
            })        
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}