module.exports = (service) => {
    
    function getTools(req, res, next) {

        service.getTools()
            .then(data => {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => next(err))        
    }

    function getTool(req, res, next) {

        const toolName = req.params.name;

        service.getTool(toolName)
            .then(data => {                
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => next(err))       
    }

    function addTool(req, res, next) {        

        const tool = req.body    
        
        service.addTool(tool)
            .then(data => {
                res.statusCode = 201
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => next(err))                
    }

    return {
        'getTools': getTools,
        'getTool': getTool,
        'addTool': addTool
    }
}