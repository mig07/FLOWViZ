module.exports = () => {
  const ok = { code: 200 };
  const created = { code: 201 };

  function getTools() {
    return Promise.resolve(toolMock);
  }

  function getTool(toolName) {
    const tool = toolMock.find((tool) => tool.general.name === toolName);
    return Promise.resolve(tool);
  }

  function addTool(body) {
    const uri = dataSourceOperations.addLibrary(body.name);
    const options = buildRequest(
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify(body)
    );
    return fetch(uri, options).catch((err) => {
      throw err;
    });
  }

  function updateTool() {
    // TODO
  }

  function buildRequest(method, headers, requestBody) {
    return {
      method: method,
      headers: headers,
      body: requestBody,
    };
  }

  return {
    getTools: getTools,
    getTool: getTool,
    addTool: addTool,
  };
};

const toolMock = [
  {
    general: {
      name: "Phylolib",
      description: "PhyloLib is a library.",
    },
    access: {
      _type: "docker",
      library: {
        address: "localhost",
        port: "5555",
        dockerDaemon: "",
        dockerImage: "",
        dockerContainer: "",
        dockerVolumes: [],
      },
    },
    library: [
      {
        name: "Arguments",
        invocation: ["-args"],
        order: 0,
        allowCommandRep: false,
        commands: [
          {
            name: "help",
            invocation: ["help"],
            allowedValues: [],
            allowedCommands: [],
            allowedCommandSets: [],
          },
          {
            name: "distance",
            invocation: ["distance"],
            allowedValues: ["hamming", "grapetree", "kimura"],
            allowedCommands: [],
            allowedCommandSets: ["Options"],
          },
          {
            name: "correction",
            invocation: ["correction"],
            allowedValues: ["jukescantor"],
            allowedCommands: [],
            allowedCommandSets: ["Options"],
          },
          {
            name: "algorithm",
            invocation: ["algorithm"],
            allowedValues: [
              "goeburst",
              "edmonds",
              "sl",
              "cl",
              "upgma",
              "upgmc",
              "wpgma",
              "wpgmc",
              "saitounei",
              "studierkepler",
              "unj",
            ],
            allowedCommands: [],
            allowedCommandSets: ["Options"],
          },
          {
            name: "optimization",
            invocation: ["optimization"],
            allowedValues: ["lbr"],
            allowedCommands: [],
            allowedCommandSets: ["Options"],
          },
        ],
      },
      {
        name: "Options",
        invocation: [],
        order: 1,
        allowCommandRep: true,
        commands: [
          {
            name: "File Output",
            invocation: ["-o", "--out"],
            allowedValues: ["file"],
            allowedCommands: [],
            allowedCommandSets: [],
          },
          {
            name: "Dataset Input",
            invocation: ["-d", "--dataset"],
            allowedValues: ["file"],
            allowedCommands: [],
            allowedCommandSets: [],
          },
          {
            name: "Distance Matrix Input",
            invocation: ["-m", "--matrix"],
            allowedValues: ["file"],
            allowedCommands: [],
            allowedCommandSets: [],
          },
          {
            name: "Phylogenetic Tree Input",
            invocation: ["-m", "--matrix"],
            allowedValues: ["file"],
            allowedCommands: [],
            allowedCommandSets: [],
          },
          {
            name: "Limit of focus variants",
            invocation: ["-l", "--lvs"],
            allowedValues: ["file"],
            allowedCommands: [],
            allowedCommandSets: [],
          },
        ],
      },
    ],
    api: [],
  },
];
