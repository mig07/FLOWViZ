module.exports = (libraryDb) => {
    
    async function getLibraries() {
        return await libraryDb.getLibraries()
    }

    async function getLibrary(libraryName) {
        return await libraryDb.getLibrary(libraryName)
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