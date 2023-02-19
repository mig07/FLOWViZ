import React, { useState } from "react";

export const LibraryRulesContext = React.createContext({});

export default function LibraryRulesProvider({ children }) {
  const generateCommandGroup = (index) => {
    return {
      name: `Command Set ${index}`,
      invocation: [],
      order: index,
      allowCommandRep: false,
      commands: [generateCommand(0)],
    };
  };

  const generateCommand = (index) => {
    return {
      name: `Command ${index}`,
      description: "",
      invocation: [],
      allowedValues: [],
      allowedCommands: [],
      allowedCommandSets: [],
    };
  };

  const [commandGroups, setCommandGroups] = useState([generateCommandGroup(0)]);

  console.log(commandGroups);

  const onCommandGroupsCountUpdate = React.useCallback((event) => {
    const updatedNumber = Number(event.target.value);
    setCommandGroups((prevCommandSets) => {
      const oldNumber = prevCommandSets.length;
      const cmdSets = [...prevCommandSets];

      if (updatedNumber < 1) return;

      const diff = updatedNumber - oldNumber;

      if (diff < 0) {
        for (var k = diff; k < 0; k++) {
          cmdSets.pop();
        }
      } else {
        for (var i = oldNumber; i < updatedNumber; i++) {
          cmdSets.push(generateCommandGroup(i));
        }
      }
      return cmdSets;
    });
  }, []);

  const onCommandsCountUpdate = React.useCallback((event, group) => {
    const updatedNumber = Number(event.target.value);
    setCommandGroups((prevCommandSets) => {
      const oldNumber = prevCommandSets[group].commands.length;
      const cmdSets = [...prevCommandSets];

      if (updatedNumber < 1) return;

      const diff = updatedNumber - oldNumber;

      if (diff < 0) {
        for (var k = diff; k < 0; k++) {
          cmdSets[group].commands.pop();
        }
      } else {
        for (var i = oldNumber; i < updatedNumber; i++) {
          cmdSets[group].commands.push(generateCommand(i));
        }
      }
      return cmdSets;
    });
  }, []);

  const onCommandPropUpdate = React.useCallback(
    (groupIndex, index, prop, event) => {
      setCommandGroups((oldCommandGroups) => {
        const updatedPropValue = event.target.value;
        const cmdGroups = [...oldCommandGroups];
        cmdGroups[groupIndex].commands[index][prop] = updatedPropValue;
        return cmdGroups;
      });
    },
    []
  );

  const onCommandCollectionUpdate = React.useCallback(
    (groupIndex, index, prop, collection) => {
      setCommandGroups((oldCommandGroups) => {
        const cmdGroups = [...oldCommandGroups];
        cmdGroups[groupIndex].commands[index][prop] = collection;
        return cmdGroups;
      });
    },
    []
  );

  const onNameUpdate = React.useCallback(
    (index, event) =>
      setCommandGroups((oldCommandGroups) => {
        const updatedName = event.target.value;
        const cmdGroups = [...oldCommandGroups];
        cmdGroups[index]["name"] = updatedName;
        return cmdGroups;
      }),
    []
  );

  const onInvocationUpdate = React.useCallback(
    (index, collection) =>
      setCommandGroups((oldCommandGroups) => {
        const cmdGroups = [...oldCommandGroups];
        cmdGroups[index]["invocation"] = collection;
        return cmdGroups;
      }),
    []
  );

  const onOrderUpdate = React.useCallback((index, event) => {
    const updatedOrder = Number(event.target.value);
    if (updatedOrder < 1) return;
    return setCommandGroups((oldCommandGroups) => {
      const cmdGroups = [...oldCommandGroups];
      cmdGroups[index]["order"] = updatedOrder;
      return cmdGroups;
    });
  }, []);

  const onAllowCommandRepUpdate = (index, event) => {
    const updatedAllowCommandRep = event.target.value;
    return setCommandGroups((oldCommandGroups) => {
      const cmdGroups = [...oldCommandGroups];
      cmdGroups[index]["allowCommandRep"] = updatedAllowCommandRep;
      return cmdGroups;
    });
  };

  return (
    <LibraryRulesContext.Provider
      value={{
        commandGroups,
        onNameUpdate,
        onInvocationUpdate,
        onOrderUpdate,
        onAllowCommandRepUpdate,
        onCommandGroupsCountUpdate,
        onCommandsCountUpdate,
        onCommandPropUpdate,
        onCommandCollectionUpdate,
      }}
    >
      {children}
    </LibraryRulesContext.Provider>
  );
}
