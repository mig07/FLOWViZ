const ToolContract = require('../schema/toolContract/ToolContract');

module.exports = (libraryDb, ApiException) => {
    
    async function getLibraries() {

        return await libraryDb.getLibraries()
    }

    async function getLibrary(libraryName) {

        const library = await libraryDb.getLibrary(libraryName)

        if (!library) {
            throw ApiException.notFound(`The library with name ${libraryName} does not exist.`)
        }

        return library
    }

    async function addLibrary(library) {

        const name = library.name

        const lib = await libraryDb.getLibrary(name)

        if (lib) {
            throw ApiException.conflict(`A library with name ${name} already exists.`)
        }

        const contract = new ToolContract({
            name: library.name,
            description: library.description,
            api: library.api,
            library: library.library
        })

        return await libraryDb.addLibrary(contract)
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}