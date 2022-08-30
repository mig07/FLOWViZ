import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CellTowerIcon from "@mui/icons-material/CellTower";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import SendIcon from "@mui/icons-material/Send";
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
import { useNavigate } from "react-router-dom";
import InfoBar from "../component/common/infoBar";
import Loading from "../component/common/loading";
import Access from "../component/postTool/accessFragment";
import General from "../component/postTool/generalFragment";
import Rules from "../component/postTool/rulesFragment";

export default function PostTool({ toolService }) {
  const navigate = useNavigate();

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

  const onSuccess = (data) => {
    navigate("/submission", {
      state: {
        text: `Successfully added ${general.name}!`,
        resourcePageLabel: general.name,
        resourcePageUrl: `/documentation/${general.name}`,
      },
    });
  };

  const OnSubmit = () => {
    const body = JSON.stringify(
      configMethod === "api"
        ? {
            general: general,
            access: { _type: configMethod, api: libraryAccess },
            api: api,
          }
        : {
            general: general,
            access: { _type: configMethod, library: libraryAccess },
            library: library,
          }
    );
    return toolService.postTool(body, onError, onSuccess(), <Loading />);
  };

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
