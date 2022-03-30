module.exports = (app, controller) => {

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/library', controller.getLibraries)

    app.get('/library/:name', controller.getLibrary)

    app.post('/library', controller.addLibrary)
      
}