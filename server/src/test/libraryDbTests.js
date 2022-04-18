const assert = require('assert');
const libraryDbDataSourceMock = require('./mock/libraryDbDataSourceMock')()
const libraryService = require('../service/libraryService')(libraryDbDataSourceMock)

describe("Test GET all libraries", () => {
    it('should get all libraries', async () => {
        const mockContractNames = ['Phylolib']
        const libraries = await libraryService.getLibraries()

        // Assert all libraries' names with mockContractNames array
        libraries.forEach((library, index) => {
            assert.equal(library.name, mockContractNames[index])
        });
    })
})

describe("Test GET Phylolib library", () => {
    it('should get only the Phylolib library details', async () => {
        const mockContractArgumentsNames = ['help', 'distance', 'correction', 'algorithm', 'optimization']
        const libraries = await libraryService.getLibrary("Phylolib")

        // Assert all Phylolib arguments with mockContractArgumentsNames array
        libraries.library.arguments.forEach((argument, index) => {
            assert.equal(argument.name, mockContractArgumentsNames[index])
        });
    })
})

/* describe("Test POST Phylolib library", () => {
    it('should post only the Phylolib library details', async () => {
        const mockContractNames = ['Phylolib']
        const libraries = await libraryService.getLibraries()
        libraries.forEach((library, index) => {
            assert.equal(library.name, mockContractNames[index])
        });
    })
}) */