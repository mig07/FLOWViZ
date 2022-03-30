'use strict'

module.exports = (libraryDataSource, fetch) => {
    const dataSourceOperations = new DataSourceOperations();

    function DataSourceOperations() {
        const baseUri = `http://${libraryDataSource.address}:${libraryDataSource.port}/${libraryDataSource.librariesIndex}`
        this.getLibraries = () => `${baseUri}/_search/`
        this.getLibrary = (libraryName) => `${baseUri}/_doc/${libraryName}`
        this.addLibrary = (libraryName) => `${baseUri}/_create/${libraryName}`
        this.updateLibrary = (libraryName) => `${baseUri}/_doc/${libraryName}`
    }

    function getLibraries() {
        return fetch(dataSourceOperations.getLibraries())
            .then(body => body.json())
            .catch(err => { throw err })
    }

    function getLibrary(libraryName) {
        return fetch(dataSourceOperations.getLibrary(libraryName))
            .then(body => body.json())
            .catch(err => { throw err })
    }

    function addLibrary(body) {
        const uri = dataSourceOperations.addLibrary(body.name)
        const options = buildRequest(
            "POST",
            { 'Content-Type': 'application/json' },
            JSON.stringify(body)
        )
        console.log(options)
        return fetch(uri, options).catch(err => { throw err })
    }

    function updateLibrary() {
        
    }

    function buildRequest(method, headers, requestBody) {
        var request = {
            "method": method,
            "headers": headers,
            "body": requestBody
        }
        console.log(request)
        return request
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}