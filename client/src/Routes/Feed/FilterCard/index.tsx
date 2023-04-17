import { Button, Paper } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import TagDropdown from "./TagDropdown";
import ApplicationDeadline from "./ApplicationDeadline";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

const followedTags = [
  "software",
  "engineering",
  "javascript",
  "react",
  "typescript",
];

const FilterCard: FC<{
  onFilter: (values: object) => void;
  applyFilterDisabled: boolean;
}> = (props) => {
  const { onFilter, applyFilterDisabled } = props;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const formik = useFormik<{ tags: string[]; beforeDeadline: boolean,resumeOptional:boolean, coverLetterOptional: boolean, jobPosition: string[] }>({
    initialValues: {
      tags: [],
      beforeDeadline: false,
      resumeOptional: false,
      coverLetterOptional: false,
      jobPosition: [],
    },
    onSubmit: (values) => {
      onFilter(values);
    },
  });
  useEffect(() => {
    formik.setFieldValue("tags", selectedTags);
  }, [selectedTags]);
  const {t} = useTranslation();
  const handleTagSelection = (value: string) => {
    if (selectedTags?.includes(value)) return;
    setSelectedTags([...selectedTags, value]);
  };
  const handleTagDeletion = (value: string) => {
    const newTags = selectedTags?.filter((tag) => tag !== value);
    //remove duplicates
    const uniqueTags = newTags?.filter(
      (tag, index) => newTags?.indexOf(tag) === index
    );
    setSelectedTags(uniqueTags);
  };
  const handleApplyAll = () => {
    const newTags = [...selectedTags, ...followedTags];
    //remove duplicates
    const uniqueTags = newTags?.filter(
      (tag, index) => newTags?.indexOf(tag) === index
    );
    setSelectedTags(uniqueTags);
  };
  const removeAllHandler = () => {
    setSelectedTags([]);
  };

  const handleBeforeDeadlineSwitch = (event: any) => {
    formik.setFieldValue("beforeDeadline", event.target.checked);
  };

  const handleRemoveFilter = () => {
    onFilter({});
  };
  const handleResumeOptionalSwitch = (event: any) => {
    formik.setFieldValue("resumeOptional", event.target.checked);
  };
  const handleCoverLetterOptionalSwitch = (event: any) => {
    formik.setFieldValue("coverLetterOptional", event.target.checked);
  };
  const handleJobPositionChange = (_: any, value: any) => {
    if (formik.values.jobPosition?.includes(value)) return;
    formik.setFieldValue("jobPosition", value);
  };
  return (
    <Paper className="w-full h-1/3 p-3">
      <div className="flex align-center items-center justify-center">
        <h1 className="font-bold text-center p-2"> {t('filterFeed.label.filterFeed')}</h1>
        <FilterAlt />
      </div>

      <TagDropdown
        followedTags={followedTags}
        selectedTags={selectedTags}
        onSelectTag={handleTagSelection}
        onTagDelete={handleTagDeletion}
        onApplyAll={handleApplyAll}
        onRemoveAll={removeAllHandler}
      />
      <ApplicationDeadline
        onJobPositionChange={handleJobPositionChange}
        onBeforeDeadlineSwitch={handleBeforeDeadlineSwitch}
        onCoverLetterOptionalSwitch={handleCoverLetterOptionalSwitch}
        onResumeOptionalSwitch={handleResumeOptionalSwitch}
      />
      <div className="flex space-x-1 justify-center max-md:space-x-9">
        <Button
          onClick={handleRemoveFilter}
          sx={{
            color: "white",
            backgroundColor: "#4D47C3",
            mt: 3,
            width: "50%",
            maxWidth: "8rem",
            "&:hover": { backgroundColor: "#4D47C3" },
          }}
          size="small"
          variant="contained"
          component="label"
          endIcon={<FilterAlt />}
        >
             {t('filterFeed.buttons.remove')}
        </Button>
        <Button
          onClick={formik.submitForm}
          disabled={applyFilterDisabled}
          variant="contained"
          component="label"
          size="small"
          sx={{
            color: "white",
            backgroundColor: "#4D47C3",
            maxWidth: "8rem",
            mt: 3,
            width: "50%",
            "&:hover": { backgroundColor: "#4D47C3" },
          }}
          endIcon={<FilterAlt />}
        >
          {t('filterFeed.buttons.apply')}
        </Button>
      </div>
    </Paper>
  );
};

export default FilterCard;
