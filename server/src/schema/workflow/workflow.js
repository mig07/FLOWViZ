const { body } = require("express-validator");

const workflowStep = {
  id: {
    exists: { errorMessage: "id is required." },
    isString: { errorMessage: "id must be a String." },
    isLength: {
      errorMessage: "id must be at least 4 characters long.",
      options: { min: 4, max: 20 },
    },
  },
  action: {
    exists: { errorMessage: "Action is required." },
  },
  previousActions: {
    isArray: {
      bail: true,
      options: {
        min: 0,
      },
      errorMessage: "Previous Actions must be an array.",
    },
  },
  nextActions: {
    isArray: {
      bail: true,
      options: {
        min: 0,
      },
      errorMessage: "Next Actions must be an array.",
    },
  },
};

module.exports = {
  workflowStep,
};
