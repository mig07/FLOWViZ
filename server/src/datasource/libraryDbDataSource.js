const ToolContract = require('../schema/toolContract/ToolContract');

module.exports = () => {

    function getLibraries() {
        return ToolContract.find({})            
    }

    function getLibrary(libraryName) {
        return ToolContract.findOne({ name: libraryName })
    }

    function addLibrary(body) {    
        return new ToolContract(body).save()
            
    }

    function updateLibrary() {
        // TODO
    }

    return {
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }
}