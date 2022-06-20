import { useState, useEffect } from "react";

const workflowStep = (name, setup) => {
  return {
    name: name,
    action: setup,
    nextActions: [],
    previousActions: [],
  };
};

export default function useWorkflow(initialValue, onCanAdvanceUpdate) {
  const [workflow, setWorkflow] = useState(initialValue);

  const addStep = (step) => {
    const updatedStep = workflowStep(step.name, step.setup);
    setWorkflow([...workflow, updatedStep]);
  };

  const removeStep = (stepName) => {
    setWorkflow((workflowSteps) =>
      workflowSteps.filter((step) => step.name !== stepName)
    );
  };

  useEffect(() => {
    if (!allStepsHaveNames(workflow)) {
      onCanAdvanceUpdate(false);
      return;
    }
    onCanAdvanceUpdate(true);
  });

  return [workflow, addStep, removeStep];
}

function allStepsHaveNames(workflow) {
  return workflow.every((step) => step.name && step.name !== "");
}
