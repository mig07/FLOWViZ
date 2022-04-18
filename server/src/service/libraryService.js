const ApiException = require('../exception/apiException')

module.exports = (libraryDb) => {
    
    async function getLibraries() {
        const libraries = await libraryDb.getLibraries()
        return libraries.hits.hits.map(library => {             
            return {
                'name': `${library._source.name}`,
                'description': `${library._source.description}`,
            }
        })
    }

    async function getLibrary(libraryName) {
        const library = await libraryDb.getLibrary(libraryName)
        if (library.found === false) {
            throw ApiException.notFound(`The library ${libraryName} does not exist.`)
        }
        return library._source            
    }

    async function addLibrary(jsonData) {
        return await libraryDb.addLibrary(jsonData)
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}