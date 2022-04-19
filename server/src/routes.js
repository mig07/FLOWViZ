const apiExceptionHandler = require('./exception/apiExceptionHandler')

module.exports = (app, libraryController, workflowController) => {
    
    /* Library Endpoints */

    // GETs
    app.get('/library', libraryController.getLibraries)
    app.get('/library/:name', libraryController.getLibrary)

    // POSTs
    app.post('/library', libraryController.addLibrary)

    /* Workflow Endpoints */

    // GETs
    app.get('/workflow', workflowController.getWorkflows)
    app.get('/workflow/:name', workflowController.getWorkflow)
    
    // POSTs
    app.post('/workflow', workflowController.postWorkflow)

    /* Express middleware error handler */
    app.use(apiExceptionHandler) 
}