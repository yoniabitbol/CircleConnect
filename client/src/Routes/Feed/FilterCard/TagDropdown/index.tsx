import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React, { FC } from "react";
import defaultTags from "../../../../lib/Constants/defaultTags";

const TagDropdown: FC<{
  followedTags: string[];
  selectedTags: string[];
  onSelectTag: (value: string) => void;
  onTagDelete: (value: string) => void;
  onApplyAll: () => void;
  onRemoveAll: () => void;
}> = (props) => {
  const {
    selectedTags,
    onSelectTag,
    onTagDelete,
    onRemoveAll,
    onApplyAll,
    followedTags,
  } = props;

  const handleTagSelection = (value: string) => {
    onSelectTag(value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTagSelection(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };
  const handleTagDeletion = (value: string) => {
    onTagDelete(value);
  };
  const handleApplyAll = () => {
    onApplyAll();
  };
  const removeAllHandler = () => {
    onRemoveAll();
  };

  function arrayEquals(a: string[], b: string[]) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  return (
    <Accordion sx={{ backgroundColor: "#ffffff", overflowY: "scroll", boxShadow:2 }}>
      <AccordionSummary
        sx={{ textAlign: "center" }}
        expandIcon={<ExpandMore />}
      >
        <h1 className="font-bold">Tags</h1>
      </AccordionSummary>
      <AccordionDetails sx={{ overflowY: "scroll", maxHeight: 400 }}>
        <input
          type="text"
          placeholder="Insert tags"
          className="w-full h-10 outline-1 focus:outline-none p-3 rounded-md"
          onKeyDown={handleKeyDown}
        />
        <hr className="" />
        {selectedTags.length > 0 && (
          <Button
            onClick={removeAllHandler}
            size="small"
            variant="text"
            sx={{
              color: "#4D47C3",
              width: "fit-content",
              "&:hover": { backgroundColor: "rgba(77,71,195, .05)" },
            }}
          >
            Remove all
          </Button>
        )}
        <div className="mt-4 overflow-scroll max-h-[7rem]">
          {selectedTags &&
            selectedTags.map((tag, index) => {
              return (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    margin: 1,
                    backgroundColor: "#4D47C3",
                    color: "white",
                    "& .MuiChip-deletable": { backgroundColor: "white" },
                  }}
                  onDelete={() => handleTagDeletion(tag)}
                />
              );
            })}
        </div>
        <div>
          <div className="flex items-center mt-3">
            <h2 className="">Followed Tags</h2>
            {!arrayEquals(selectedTags, followedTags) && (
              <Button
                  variant="text"
                size="small"
                className="w-1/3"
                sx={{
                  width: "fit-content",
                  ml: 4,

                }}
                onClick={handleApplyAll}
              >
                Apply All
              </Button>
            )}
          </div>
          <div className="max-h-[10rem] overflow-auto rouder-2xl min-h-[5rem]">
            {followedTags.map((tag, index) => {
              {
                if (selectedTags?.includes(tag)) return;
              }
              return (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ margin: 1 }}
                  onClick={() => handleTagSelection(tag)}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-2">
          <h2>Other Tags</h2>
          <div className="max-h-[10rem] overflow-auto rouder-2xl">
            {defaultTags.map((tag, index) => {
              {
                if (followedTags?.includes(tag)) return;
              }
              {
                if (selectedTags?.includes(tag)) return;
              }
              return (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ margin: 1 }}
                  onClick={() => handleTagSelection(tag)}
                />
              );
            })}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default TagDropdown;
