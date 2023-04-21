import { useState, FC, useEffect } from "react";
import createPost from "../../../http/createPost";
import {
  Card,
  Modal,
  CardActions,
  TextareaAutosize,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import styles from "./style.module.css";
import { Send, InsertPhoto, Tag, Settings, Close } from "@mui/icons-material";
import TagSelection from "./TagSelection";
import JobSettingsModal from "./JobSettingsModal";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Usertypes from "../../../Models/UserProfileModel";
import getAllUsers from "../../../http/getAllUsers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgColor: "white",
};

const NewPostModal: FC<{
  showModal: boolean;
  handleModalClose: () => void;
  fetchFeed: () => void;
  postStatus: (value: boolean) => void;
}> = (props) => {
  const { t } = useTranslation();
  const { showModal, handleModalClose, fetchFeed, postStatus } = props;
  const formik = useFormik<any>({
    initialValues: {
      text: "",
      isJobListing: false,
      isResumeRequired: false,
      isCoverLetterRequired: false,
      preferenceTags: [],
      isThirdParty: false,
      thirdPartyLink: "",
      position: null,
    },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      createPost(formData)
        .then((res) => {
          if (res.status === "success") {
            resetForm();
            handleModalClose();
            postStatus(true);
            fetchFeed();
          } else {
            handleModalClose();
            postStatus(false);
          }
        })
        .catch(() => {
          handleModalClose();
          postStatus(false);
        });
    },
  });
  const [allUsers, setAllUsers] = useState<Usertypes[]>();
  const [showTagSelection, setShowTagSelection] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showJobSettings, setShowJobSettings] = useState<boolean>(false);
  const [settings, setSettings] = useState<{
    isResumeRequired: boolean;
    isCoverLetterRequired: boolean;
    uploadDeadline: Date | null;
    thirdPartyLink: string | null;
    position: string | null;
  }>({
    isResumeRequired: false,
    isCoverLetterRequired: false,
    uploadDeadline: null,
    thirdPartyLink: null,
    position: null,
  });
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const allUsers = await getAllUsers();
        setAllUsers(allUsers.data); // get post from the response object
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllUsers();
  }, [allUsers?.length]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  const textAreaRows = windowWidth > 640 ? 8 : 18;
  const handleTagSelectionClose = () => {
    setShowTagSelection(false);
  };
  const handleTagsSelection = (values: string) => {
    const newTags = selectedTags?.concat(values);
    setSelectedTags(newTags);
    formik.setFieldValue("preferenceTags", newTags);
  };
  const handleTagDeletion = (value: string | undefined) => {
    const newTags = selectedTags?.filter((tag) => tag !== value);
    setSelectedTags(newTags);
    formik.setFieldValue("preferenceTags", newTags);
  };
  const resetTags = () => {
    setSelectedTags([]);
    formik.setFieldValue("preferenceTags", []);
    handleModalClose();
  };

  const resetJobSettings = () => {
    setSettings({
      isResumeRequired: false,
      isCoverLetterRequired: false,
      uploadDeadline: null,
      thirdPartyLink: "",
      position: null,
    });
    formik.setFieldValue("isResumeRequired", false);
    formik.setFieldValue("isCoverLetterRequired", false);
    formik.setFieldValue("thirdPartyLink", "");
    formik.setFieldValue("position", null);
  };
  useEffect(() => {
    if (!formik.values.isJobListing) {
      resetJobSettings();
    } else {
      setShowJobSettings(true);
    }
  }, [formik.values.isJobListing]);

  const jobSettingsChangeHandler = (type: string, value: any) => {
    const newSettings = { ...settings, [type]: value };
    setSettings(newSettings);
    for (const key in newSettings) {
      if (key === "uploadDeadline" && newSettings[key] === null) {
        continue;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formik.setFieldValue(key, newSettings[key]);
    }
  };

  const disablePostButton =
    formik.values.text === "" ||
    (formik.values.isJobListing && !formik.values.position);
  return (
    <Modal open={showModal} onClose={resetTags}>
      <>
        <Card className={styles.modal} sx={style}>
          <div className="w-full sticky top-0 bg-white p-2 z-20 dark:primary-dark">
            <div className="flex">
              <h6 className="font-bold p-3">{t("common.buttons.newPost")}</h6>
              <IconButton
                onClick={handleModalClose}
                sx={{ position: "absolute", right: 0 }}
              >
                <Close />
              </IconButton>
            </div>

            <hr className="ml-4 w-9/10 bg-gray-300" />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-2 relative bottom-0">
              <TextareaAutosize
                name="text"
                onChange={formik.handleChange}
                value={formik.values.text}
                minRows={textAreaRows}
                maxRows={textAreaRows}
                className="w-full  outline-none relative resize-none dark:primary-dark"
                placeholder={
                  t("common.label.onYourMind") || "Whats on your mind?"
                }
              />
              {formik.values.image && (
                <div className="flex items-center space-x-1">
                  <h6 className="font-semibold mt-2 p-2">Image</h6>
                  <div className="flex space-x-1 mt-2 overscroll-x-auto max-w-9/10 overflow-x-auto items-center">
                    <Chip
                      sx={{
                        margin: 1,
                        backgroundColor: "#4D47C3",
                        color: "white",
                        "& .MuiChip-deletable": { backgroundColor: "white" },
                      }}
                      key={1}
                      label={formik.values.image.name}
                      onDelete={() => formik.setFieldValue("image", null)}
                    />
                  </div>
                </div>
              )}
              {formik.values.preferenceTags.length > 0 && (
                <div className="items-center flex">
                  <h6 className="font-semibold mt-2 p-2">
                    {t("userProfile.label.tags")}
                  </h6>
                  <div className="flex space-x-1 mt-2 overscroll-x-auto max-w-9/10 overflow-x-auto items-center">
                    {formik.values.preferenceTags.map(
                      (tag: string, index: number) => {
                        return (
                          <Chip
                            sx={{
                              margin: 1,
                              backgroundColor: "#4D47C3",
                              color: "white",
                              "& .MuiChip-deletable": {backgroundColor: "white",},
                            }}
                            key={index}
                            label={tag}
                            onDelete={() => handleTagDeletion(tag)}
                          />
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
            <CardActions className="fixed bottom-0 w-full p-2 z-20 flex">
              <div className="w-fit flex justify-start">
                <FormControlLabel
                  name="isJobListing"
                  control={
                    <Checkbox
                      onChange={formik.handleChange}
                      checked={formik.values.isJobListing}
                    />
                  }
                  label={t("jobPosted.label.jobPosting")}
                />
                <IconButton
                  disabled={!formik.values.isJobListing}
                  sx={{
                    marginRight: 50,
                    color: `${
                      formik.values.isJobListing &&
                      !formik.values.position &&
                      "red"
                    }`,
                  }}
                  onClick={() => setShowJobSettings(true)}
                >
                  <Settings />
                </IconButton>
              </div>
              <div className="fixed right-0 bottom-1 flex space-x-1 px-2 justify-end">
                <IconButton
                  disabled={!formik.values.isJobListing}
                  sx={{ display: "flex", justifyContent: "end" }}
                  onClick={() => setShowTagSelection(true)}
                >
                  <Tag />
                </IconButton>
                <IconButton
                  component="label"
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <input
                    hidden
                    name="image"
                    onChange={(event) => {
                      const file: FileList | null = event.currentTarget.files;
                      if (!file) return;
                      else {
                        formik.setFieldValue("image", file[0]);
                      }
                    }}
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                        text/plain, application/pdf, image/*"
                    id="icon-button-file"
                    type="file"
                  />
                  <InsertPhoto />
                </IconButton>
                <Button
                  sx={{
                    width: "100px",
                    backgroundColor: "#4D47C3",
                    "&:hover": { backgroundColor: "#4D47C3" },
                  }}
                  variant="contained"
                  disableElevation
                  className={styles.sendButton}
                  type="submit"
                  disabled={disablePostButton}
                >
                  <span className={styles.buttonText}>
                    {t("common.buttons.post")}
                  </span>
                  <Send className={styles.sendIcon} />
                </Button>
              </div>
            </CardActions>
          </form>
        </Card>
        <div>
          <TagSelection
            showModal={showTagSelection}
            handleModalClose={handleTagSelectionClose}
            onSelectTag={handleTagsSelection}
            onDeleteTag={handleTagDeletion}
            selectedTags={selectedTags}
          />
          <JobSettingsModal
            showModal={showJobSettings}
            handleModalClose={() => setShowJobSettings(false)}
            values={{
              position: formik.values.position,
              uploadDeadline: formik.values.uploadDeadline,
              isResumeRequired: formik.values.isResumeRequired,
              isCoverLetterRequired: formik.values.isCoverLetterRequired,
              isThirdParty: formik.values.isThirdParty,
              thirdPartyLink: formik.values.thirdPartyLink,
            }}
            onChange={jobSettingsChangeHandler}
          />
        </div>
      </>
    </Modal>
  );
};

export default NewPostModal;
