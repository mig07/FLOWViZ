import {
  Button,
  Container,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import Access from "../component/postTool/accessFragment";
import General from "../component/postTool/generalFragment";
import Rules from "../component/postTool/rulesFragment";

export default function PostTool() {
  const [activeStep, setActiveStep] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const [configMethod, setConfigMethod] = useState("");

  const onConfigMethodUpdate = (method) => {
    setConfigMethod(method);
  };

  const handleNext = () => {
    if (!canAdvance) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCanAdvance(false);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [general, setGeneral] = useState({
    name: "",
    description: "",
  });

  const [access, setAccess] = useState({
    address: "",
    port: "",
  });

  const onGeneralUpdate = (gen) => {
    setGeneral(gen);
  };

  const onAccessUpdate = (acc) => {
    setAccess(acc);
  };

  console.log(general);
  console.log(access);

  const [api, setApi] = useState([]);
  const [library, setLibrary] = useState([
    {
      name: "Command Set 0",
      invocation: [],
      order: 0,
      allowCommandRep: false,
      commands: [
        {
          name: "Command 0",
          invocation: [],
          values: [],
          subCommands: [],
          subCommandSets: [],
        },
      ],
    },
  ]);

  const onApiChange = (updatedApi) => {
    setApi(updatedApi);
  };

  const onLibraryChange = (updatedLib) => {
    setLibrary(updatedLib);
  };

  const steps = [
    {
      label: "General",
      description: "Tool's relevant metadata.",
      fragment: (
        <General
          onGeneralUpdate={onGeneralUpdate}
          setCanAdvance={setCanAdvance}
          name={general.name}
          description={general.description}
        />
      ),
    },
    {
      label: "Access",
      description: "Where the tool is located and how it can be accessed.",
      fragment: (
        <Access
          onAccessUpdate={onAccessUpdate}
          setCanAdvance={setCanAdvance}
          address={access.address}
          port={access.port}
        />
      ),
    },
    {
      label: "Rules",
      description:
        "The rules and guidelines needed to configure and use the tool.",
      fragment: (
        <Rules
          api={api}
          library={library}
          configMethod={configMethod}
          onMethodChoice={onConfigMethodUpdate}
          onApiChange={onApiChange}
          onLibraryChange={onLibraryChange}
        />
      ),
    },
  ];

  return (
    <Container component="main" maxWidth="lg">
      <Toolbar />
      <>
        <Typography variant="h2">Add tool</Typography>
        <Divider />
        <Toolbar />
      </>
      <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mt: 2 }}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep].fragment}
      <Grid container>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={() => handleBack()}>
            Previous
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          direction="column"
          sx={{
            display: "flex",
            "justify-content": "flex-end",
            "align-items": "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => handleNext()}
            disabled={!canAdvance}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      {/* <Paper elevation={0} sx={{ p: 2, maxHeight: 800, overflow: "auto" }}>
        <Stack spacing={2}>
          <SettingsAccordion
            name="API"
            description="Describe your tool's endpoints"
          >
            <BaseToolAccordion onParentUpdate={onApiChange} data={api} />
          </SettingsAccordion>
          <SettingsAccordion
            name="Library"
            description="Describe your tool's library commands"
          >
            <BaseToolAccordion onParentUpdate={onLibraryChange} data={library}>
              <CommandGroups onParentUpdate={onLibraryChange} data={library} />
            </BaseToolAccordion>
          </SettingsAccordion>
        </Stack>
      </Paper>
      <Box sx={{ mt: 2 }} textAlign="right">
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={() => {
            console.log({ api: api, library: library });
          }}
        >
          Submit
        </Button>
      </Box> */}
    </Container>
  );
}

function areFieldsFilled(fields) {
  return Object.values(fields).every((value) => value !== "");
}
