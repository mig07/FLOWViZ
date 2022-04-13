const apiExceptionHandler = require('./exception/apiExceptionHandler')

module.exports = (app, controller) => {
    
    app.get('/library', controller.getLibraries)
    app.get('/library/:name', controller.getLibrary)
    app.post('/library', controller.addLibrary)

    // Express middleware error handler
    app.use(apiExceptionHandler) 
}