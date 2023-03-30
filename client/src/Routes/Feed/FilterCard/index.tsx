import { Button, Paper } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import TagDropdown from "./TagDropdown";
import ApplicationDeadline from './ApplicationDeadline';
import { FC, useEffect, useState } from "react";

const followedTags = [
  "software",
  "engineering",
  "javascript",
  "react",
  "typescript",
];

const FilterCard: FC<{ onFilter: (values: object) => void }> = (props) => {
  const { onFilter } = props;
  const [filter, setFilter] = useState<any>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  useEffect(() => {
    setFilter({ tags: selectedTags });
  }, [selectedTags]);
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
      console.log(event.target.checked)
    setFilter({ ...filter, beforeDeadline: event.target.checked });
  }

  const isFiltersAreEmpty = filter.tags?.length === 0;

  const handleApplyFilter = () => {
    onFilter(filter);
  };
  const handleRemoveFilter = () => {
    onFilter({});
  };
  return (
    <Paper className="w-full h-1/3 p-3">
      <div className="flex align-center items-center justify-center">
        <h1 className="font-bold text-center p-2">Filter Feed</h1>
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
        <ApplicationDeadline onBeforeDeadlineSwitch={handleBeforeDeadlineSwitch}/>
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
          Remove
        </Button>
        <Button
          onClick={handleApplyFilter}
          disabled={isFiltersAreEmpty}
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
          Apply
        </Button>
      </div>
    </Paper>
  );
};

export default FilterCard;
