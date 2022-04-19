const ToolContract = require('../schema/library-schema.json');

module.exports = (libraryDb, validator, ApiException) => {
    
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

    async function addLibrary(library) {

        const isLibraryValid = validator.isValid(library, ToolContract)

        if (!isLibraryValid) {
            throw ApiException.badRequest("This library contract is not valid!")
        }

        return await libraryDb.addLibrary(library)
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}