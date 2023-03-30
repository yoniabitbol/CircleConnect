import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import defaultJobPositions from "../../../../lib/Constants/defaultJobPositions";
import { FC } from "react";
const ApplicationDeadline: FC<{
  onBeforeDeadlineSwitch: (event: any) => void;
}> = (props) => {
  const { onBeforeDeadlineSwitch } = props;
  return (
    <Accordion
      sx={{ backgroundColor: "#ffffff", overflowY: "scroll", boxShadow: 2 }}
    >
      <AccordionSummary
        sx={{ textAlign: "center" }}
        expandIcon={<ExpandMore />}
      >
        <h1 className="font-bold">Application</h1>
      </AccordionSummary>
      <AccordionDetails>
        <Autocomplete
          sx={{ width: "100%" }}
          options={defaultJobPositions}
          freeSolo={true}
          renderInput={(params) => (
            <TextField {...params} label="Job Postion" />
          )}
        />
        <FormControlLabel
          onChange={onBeforeDeadlineSwitch}
          labelPlacement="start"
          control={
              <Switch color="primary"
              />
          }
          label="Before Deadline"
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ApplicationDeadline;
