const workflow = {
  name: {
    exists: { errorMessage: "name is required." },
    isString: { errorMessage: "name must be a String." },
    isLength: {
      errorMessage: "name must be at least 2 characters long.",
      options: { min: 2, max: 20 },
    },
  },
  start_date: {
    exists: { errorMessage: "Start date is required." },
    isString: { errorMessage: "Start date must be a String." },
  },
  "tasks.*.id": {
    exists: { errorMessage: "Task id is required." },
    isString: { errorMessage: "Task id must be a String." },
    isLength: {
      errorMessage: "Task id must be at least 2 characters long.",
      options: { min: 2, max: 20 },
    },
  },
  "tasks.*.action": {
    exists: { errorMessage: "Action field is required." },
  },
  "tasks.*.action.command": {
    exists: { errorMessage: "The action does not contain a command." },
  },
  "tasks.*.children": {
    isArray: {
      bail: true,
      options: {
        min: 0,
      },
      errorMessage: "Children tasks must be an array.",
    },
  },
};

module.exports = { workflow };
