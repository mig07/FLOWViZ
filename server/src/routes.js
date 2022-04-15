const apiExceptionHandler = require('./exception/apiExceptionHandler')

module.exports = (app, controller) => {
    
    /* Library Endpoints */

    // GETs
    app.get('/library', controller.getLibraries)
    app.get('/library/:name', controller.getLibrary)

    // POSTs
    app.post('/library', controller.addLibrary)

    /* Express middleware error handler */
    app.use(apiExceptionHandler) 
}