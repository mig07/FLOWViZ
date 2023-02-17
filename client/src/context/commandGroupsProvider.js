import React, { useState } from "react";

export const CommandGroupsContext = React.createContext({});

export default function CommandGroupsProvider({ children }) {
  const generateCommandGroup = (index) => {
    return {
      name: `Command Set ${index}`,
      invocation: [],
      order: index,
      allowCommandRep: false,
    };
  };

  const [commandGroups, setCommandGroups] = useState([generateCommandGroup(0)]);

  console.log(commandGroups);

  const onCommandsCountUpdate = (event) => {
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
  };

  const onNameUpdate = (index, event) =>
    setCommandGroups((oldCommandGroups) => {
      const updatedName = event.target.value;
      const cmdGroups = [...oldCommandGroups];
      cmdGroups[index]["name"] = updatedName;
      return cmdGroups;
    });

  const onInvocationUpdate = (index, collection) =>
    setCommandGroups((oldCommandGroups) => {
      const cmdGroups = [...oldCommandGroups];
      cmdGroups[index]["invocation"] = collection;
      return cmdGroups;
    });

  const onOrderUpdate = (index, event) => {
    const updatedOrder = Number(event.target.value);
    if (updatedOrder < 1) return;
    return setCommandGroups((oldCommandGroups) => {
      const cmdGroups = [...oldCommandGroups];
      cmdGroups[index]["order"] = updatedOrder;
      return cmdGroups;
    });
  };

  const onAllowCommandRepUpdate = (index, event) => {
    const updatedAllowCommandRep = event.target.value;
    return setCommandGroups((oldCommandGroups) => {
      const cmdGroups = [...oldCommandGroups];
      cmdGroups[index]["allowCommandRep"] = updatedAllowCommandRep;
      return cmdGroups;
    });
  };

  return (
    <CommandGroupsContext.Provider
      value={{
        commandGroups,
        onNameUpdate,
        onInvocationUpdate,
        onOrderUpdate,
        onAllowCommandRepUpdate,
        onCommandsCountUpdate,
      }}
    >
      {children}
    </CommandGroupsContext.Provider>
  );
}
