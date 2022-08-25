const assert = require("assert");
const toolDbDataSourceMock = require("./toolDbDataSourceMock")();
const toolService = require("../../services/toolService")(toolDbDataSourceMock);
const toolController = require("../../controllers/toolController")(toolService);

describe("Test GET all libraries", () => {
  it("should get all libraries with status code 200", async () => {
    const mockContractNames = ["Phylolib"];

    const tools = toolController.getTools();

    // Assert all libraries' names with mockContractNames array
    tools.forEach((tool, index) => {
      assert.equal(tool.name, mockContractNames[index]);
    });
  });
});

describe("Test GET Phylolib library", () => {
  it("should get only the Phylolib library details", async () => {
    const mockContractCmdNamesFromFirstGroup = [
      "help",
      "distance",
      "correction",
      "algorithm",
      "optimization",
    ];
    const tool = await toolService.getTool("Phylolib");

    // Assert all Phylolib arguments with mockContractArgumentsNames array
    tool.library[0].commands.forEach((command, index) => {
      assert.equal(command.name, mockContractCmdNamesFromFirstGroup[index]);
    });
  });
});

/* describe("Test POST Phylolib library", () => {
    it('should post only the Phylolib library details', async () => {
        const mockContractNames = ['Phylolib']
        const libraries = await libraryService.getLibraries()
        libraries.forEach((library, index) => {
            assert.equal(library.name, mockContractNames[index])
        });
    })
}) */
