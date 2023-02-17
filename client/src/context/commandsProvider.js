import React, { useState } from "react";

export const CommandsContext = React.createContext({});

export default function CommandsProvider({ children }) {
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

  const [commands, setCommands] = useState([generateCommand(0)]);

  console.log(commands);

  const onCommandsCountUpdate = (event) => {
    const updatedNumber = Number(event.target.value);
    setCommands((oldCommands) => {
      const oldNumber = oldCommands.length;
      const cmds = [...oldCommands];

      if (updatedNumber < 1) return;

      const diff = updatedNumber - oldNumber;

      if (diff < 0) {
        for (var k = diff; k < 0; k++) {
          cmds.pop();
        }
      } else {
        for (var i = oldNumber; i < updatedNumber; i++) {
          cmds.push(generateCommand(i));
        }
      }
      return cmds;
    });
  };

  const onNameUpdate = (index, event) =>
    setCommands((oldCommands) => {
      const updatedName = event.target.value;
      const cmdGroups = [...oldCommands];
      cmdGroups[index]["name"] = updatedName;
      return cmdGroups;
    });

  const onDescriptionUpdate = (index, event) =>
    setCommands((oldCommands) => {
      const updatedDescription = event.target.value;
      const cmdGroups = [...oldCommands];
      cmdGroups[index]["description"] = updatedDescription;
      return cmdGroups;
    });

  const onCollectionUpdate = (index, prop, collection) =>
    setCommands((oldCommands) => {
      const cmdGroups = [...oldCommands];
      cmdGroups[index][prop] = collection;
      return cmdGroups;
    });

  return (
    <CommandsContext.Provider
      value={{
        commands,
        onCommandsCountUpdate,
        onNameUpdate,
        onDescriptionUpdate,
        onCollectionUpdate,
      }}
    >
      {children}
    </CommandsContext.Provider>
  );
}
