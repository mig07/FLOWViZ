const assert = require('assert');
const toolDbDataSourceMock = require('./mock/toolDbDataSourceMock')()
const toolService = require('../service/toolService')(toolDbDataSourceMock)

describe("Test GET all libraries", () => {
    it('should get all libraries', async () => {
        const mockContractNames = ['Phylolib']
        const tools = await toolService.getTools()

        // Assert all libraries' names with mockContractNames array
        tools.forEach((tool, index) => {
            assert.equal(tool.name, mockContractNames[index])
        });
    })
})

describe("Test GET Phylolib library", () => {
    it('should get only the Phylolib library details', async () => {
        const mockContractArgumentsNames = ['help', 'distance', 'correction', 'algorithm', 'optimization']
        const tools = await toolService.getTool("Phylolib")

        // Assert all Phylolib arguments with mockContractArgumentsNames array
        tools.library.arguments.forEach((argument, index) => {
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