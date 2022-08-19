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
import { useState } from "react";
import Access from "../component/postTool/accessFragment";
import General from "../component/postTool/generalFragment";
import Rules from "../component/postTool/rulesFragment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CellTowerIcon from "@mui/icons-material/CellTower";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SendIcon from "@mui/icons-material/Send";
import Request from "../service/request";
import Loading from "../component/common/loading";
import InfoBar from "../component/common/infoBar";
import Submission from "../component/common/submission";

export default function PostTool() {
  const [activeStep, setActiveStep] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const [configMethod, setConfigMethod] = useState("api");

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

  const onGeneralUpdate = (gen) => {
    setGeneral(gen);
  };

  const [libraryAccess, setLibraryAccess] = useState({
    address: "",
    port: "",
    isContainer: false,
    dockerDaemon: "",
    dockerImage: "",
    dockerContainer: "",
    dockerVolumes: [],
  });

  const onLibraryAccessUpdate = (acc) => {
    setLibraryAccess(acc);
  };

  const [apiAccess, setApiAccess] = useState({
    url: "",
    apiKey: "",
  });

  const onApiAccessUpdate = (acc) => {
    setApiAccess(acc);
  };

  const generateEndpoint = (index) => {
    return {
      name: `Endpoint ${index}`,
      description: [],
      method: "",
      path: "",
      headers: {},
      body: {},
    };
  };

  const [api, setApi] = useState([generateEndpoint(0)]);
  console.log(api);

  const generateCommandGroup = (index) => {
    return {
      name: `Command Set ${index}`,
      invocation: [],
      order: index,
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
    };
  };

  const [library, setLibrary] = useState([generateCommandGroup(0)]);

  const onApiUpdate = (updatedApi) => {
    setApi(updatedApi);
  };

  const onLibraryUpdate = (updatedLib) => {
    setLibrary(updatedLib);
  };

  const [submitting, setSubmitting] = useState(false);

  const steps = [
    {
      label: "General",
      icon: <BadgeOutlinedIcon />,
      description: "Tool's relevant metadata.",
      fragment: (
        <General
          onGeneralUpdate={onGeneralUpdate}
          setCanAdvance={setCanAdvance}
          general={general}
        />
      ),
    },
    {
      label: "Access",
      icon: <CellTowerIcon />,
      description: "Where the tool is located and how it can be accessed.",
      fragment: (
        <Access
          apiAccess={apiAccess}
          libraryAccess={libraryAccess}
          configMethod={configMethod}
          onLibraryAccessUpdate={onLibraryAccessUpdate}
          onApiAccessUpdate={onApiAccessUpdate}
          setCanAdvance={setCanAdvance}
          onMethodChoice={onConfigMethodUpdate}
        />
      ),
    },
    {
      label: "Rules",
      icon: <FactCheckOutlinedIcon />,
      description:
        "The rules and guidelines needed to configure and use the tool.",
      fragment: (
        <Rules
          api={api}
          library={library}
          configMethod={configMethod}
          onLibraryUpdate={onLibraryUpdate}
          generateCommandGroup={generateCommandGroup}
          onApiUpdate={onApiUpdate}
          generateEndpoint={generateEndpoint}
        />
      ),
    },
  ];

  const BackButton = () => (
    <Grid item xs={6}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => handleBack()}
        disabled={activeStep === 0}
      >
        Previous
      </Button>
    </Grid>
  );

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      configMethod === "api"
        ? {
            name: general.name,
            description: general.description,
            type: configMethod,
            api: api,
          }
        : {
            name: general.name,
            description: general.description,
            type: configMethod,
            library: library,
          }
    ),
  };

  const onError = (error) => (
    <Container component="main" maxWidth="lg">
      <Toolbar />
      <>
        <Typography variant="h2">Add tool</Typography>
        <Divider />
        <Toolbar />
      </>
      <>
        <Stepper
          activeStep={activeStep}
          orientation="horizontal"
          sx={{ mt: 2 }}
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {steps[activeStep].fragment}
        <Grid container>
          <BackButton />
          <NextButton />
        </Grid>
      </>
      <InfoBar type="error" text={error} />
    </Container>
  );

  const onSuccess = (data) => (
    <React.Fragment>
      <Toolbar />
      <Submission
        text={`Successfully added ${general.name}`}
        Icon={HowToRegIcon}
      />
    </React.Fragment>
  );

  const OnSubmit = () =>
    Request(
      "http://localhost:3000/tool",
      options,
      onError,
      onSuccess,
      <Loading />
    );

  const NextButton = () => (
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
      {activeStep === steps.length - 1 ? (
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={() => setSubmitting(true)}
        >
          Finish
        </Button>
      ) : (
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => handleNext()}
          disabled={!canAdvance}
        >
          Next
        </Button>
      )}
    </Grid>
  );

  return submitting ? (
    <OnSubmit />
  ) : (
    <Container component="main" maxWidth="lg">
      <Toolbar />
      <>
        <Typography variant="h2">Add tool</Typography>
        <Divider />
        <Toolbar />
      </>
      <>
        <Stepper
          activeStep={activeStep}
          orientation="horizontal"
          sx={{ mt: 2 }}
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {steps[activeStep].fragment}
        <Grid container>
          <BackButton />
          <NextButton />
        </Grid>
      </>
    </Container>
  );
}
