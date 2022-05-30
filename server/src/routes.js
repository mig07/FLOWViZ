const apiExceptionHandler = require('./exception/apiExceptionHandler')

module.exports = (app, toolController, workflowController, dev) => {
    
    const apiExceptionHandler = require('./exception/apiExceptionHandler')(dev)

    /* Library Endpoints */

    // GETs
    app.get('/tool', toolController.getTools)
    app.get('/tool/:name', toolController.getTool)

    // POSTs
    app.post('/tool', toolController.addTool)

    /* Workflow Endpoints */

    // GETs
    app.get('/workflow', workflowController.getWorkflows)
    app.get('/workflow/:name', workflowController.getWorkflow)
    
    // POSTs
    app.post('/workflow', workflowController.postWorkflow)

    /* Express middleware error handler */
    app.use(apiExceptionHandler.interceptor) 
}