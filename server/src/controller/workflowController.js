module.exports = (libraryService, workflowService) => {

    function getWorkflows(req, res, next) {
        
    }

    function getWorkflow(req, res, next) {

    }

    function postWorkflow(req, res, next) {
        
        const workflow = req.body

        workflowService.postWorkflow(workflow)
            .then(data => {
                res.statusCode = 201
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            })
            .catch(err => next(err))
    }

    return {
        'getWorkflows': getWorkflows,
        'getWorkflow': getWorkflow,
        'postWorkflow': postWorkflow,
    }
}