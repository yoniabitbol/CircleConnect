import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import defaultJobPositions from "../../../../lib/Constants/defaultJobPositions";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const ApplicationDeadline: FC<{
  onBeforeDeadlineSwitch: (event: any) => void;
  onResumeOptionalSwitch: (event: any) => void;
  onCoverLetterOptionalSwitch: (event: any) => void;
  onJobPositionChange: (event: any, value: any) => void;
}> = (props) => {
  const {
    onBeforeDeadlineSwitch,
    onResumeOptionalSwitch,
    onCoverLetterOptionalSwitch,
    onJobPositionChange,
  } = props;
  const {t} = useTranslation();
  return (
    <Accordion
      sx={{ backgroundColor: "#ffffff", overflowY: "scroll", boxShadow: 2 }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <h1 className="font-bold">{t('filterFeed.buttons.application')}</h1>
      </AccordionSummary>
      <AccordionDetails className="">
        <Autocomplete
          multiple
          limitTags={3}
          sx={{ width: "100%" }}
          options={defaultJobPositions}
          freeSolo={true}
          onChange={onJobPositionChange}
          renderInput={(params) => (
            <TextField {...params} label={t('filterFeed.buttons.jobPosition')} />
          )}
        />
        <div className=" mt-2">
          <FormControlLabel
            onChange={onBeforeDeadlineSwitch}
            labelPlacement="start"
            control={<Switch color="primary" className="mr-4" />}
            label={<Typography className="">{t('filterFeed.buttons.bfrDeadline')}</Typography>}
          />
          <Typography
            variant="h5"
            className="w-full text-center border-b-2 mt-4"
          >
            {t('filterFeed.label.makeOptional')}
          </Typography>
          <div className="mt-3">
            <FormControlLabel
              onChange={onResumeOptionalSwitch}
              labelPlacement="end"
              className="w-full"
              control={<Switch color="primary" />}
              label={<Typography className="">{t('filterFeed.buttons.resume')}</Typography>}
            />
            <FormControlLabel
              onChange={onCoverLetterOptionalSwitch}
              labelPlacement="end"
              className="w-full"
              control={<Switch color="primary" />}
              label={<Typography className="">{t('filterFeed.buttons.coverLetter')}</Typography>}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ApplicationDeadline;
