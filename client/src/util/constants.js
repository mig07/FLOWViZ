const toolSetupInitialState = {
    api: {
      general: {
        name: "",
        description: "",
      },
      access: {
        address: "",
        port: "",
      },
    },
    library: {
      general: {
        name: "",
        description: "",
      },
      access: {
        address: "",
        port: "",
      },
      commandGroups: {
        count: 1,
        groups: [
          {
            name: "",
            invocation: [],
            order: 0,
            count: 1,
            commands: [
              {
                name: "",
                invocation: [],
                values: [],
                subCommands: [],
                subCommandSets: [],
              },
            ],
          },
        ],
      },
    },
  };

export default toolSetupInitialState