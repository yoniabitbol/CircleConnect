import {useState, FC, useEffect} from 'react';
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
} from '@mui/material';
import styles from './style.module.css';
import {Send, InsertPhoto, Tag, Settings, Close} from '@mui/icons-material';
import TagSelection from './TagSelection';
import JobSettingsModal from './JobSettingsModal';
import {useFormik} from 'formik';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgColor: 'white',
};
const NewPostModal:FC<{showModal: boolean, handleModalClose:()=>void}> = (props) => {
    const {showModal, handleModalClose} = props;
    const formik = useFormik<any>({
            initialValues: {postMessage: '', isJobPosting: false, jobSettings: { isResumeRequired:false, isCoverLetterRequired:false, applicationDeadline: null}, tags:[], photo: File},
            onSubmit: (values,{resetForm}) => {
                console.log(values);
                resetForm();
                // handleModalClose();
            }
        })
    const [showTagSelection, setShowTagSelection] =useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showJobSettings, setShowJobSettings] = useState<boolean>(false);
    const [settings, setSettings] = useState<{isResumeRequired: boolean, isCoverLetterRequired: boolean, applicationDeadline: Date | null}>({isResumeRequired: false, isCoverLetterRequired: false, applicationDeadline: null});
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, );
    const textAreaRows = windowWidth > 640 ? 8 : 18;
    const handleTagSelectionClose = () => {
        setShowTagSelection(false);
    }
    const handleTagsSelection = (values: string) => {
      const newTags = selectedTags?.concat(values);
        setSelectedTags(newTags);
        formik.setFieldValue('tags', newTags);
    }
    const handleTagDeletion = (value: string | undefined) => {
        const newTags = selectedTags?.filter(tag => tag !== value);
        setSelectedTags(newTags);
        formik.setFieldValue('tags', newTags);
    }
    const resetTags = () => {
        setSelectedTags([]);
        formik.setFieldValue('tags', []);
        handleModalClose();
    }
    const jobSettingsChangeHandler = (type: string, value: any) => {
        const newSettings = {...settings, [type]: value};
        setSettings(newSettings);
        formik.setFieldValue('jobSettings', newSettings);
    }
    return (
            <Modal
                open={showModal}
                onClose={resetTags}
            >
                <>
                    <Card className={styles.modal} sx={style}>
                        <div className="w-full sticky top-0 bg-white p-2 z-20">
                            <div className="flex">
                                <h6 className="font-bold p-3">NEW POST</h6>
                                <IconButton onClick={handleModalClose} sx={{position:'absolute', right:0}}><Close/></IconButton>
                            </div>

                            <hr className="ml-4 w-9/10 bg-gray-300"/>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-2 relative bottom-0">
                                <TextareaAutosize name="postMessage" onChange={formik.handleChange} value={formik.values.postMessage} minRows={textAreaRows} maxRows={textAreaRows} className="w-full  outline-none relative resize-none" placeholder="Whats on your mind?"/>

                                {formik.values.photo[0] && <div className="flex items-center space-x-1">
                                <h6 className="font-semibold mt-2 p-2">Image</h6>
                                <div className="flex space-x-1 mt-2 overscroll-x-auto max-w-9/10 overflow-x-auto items-center">
                                    <Chip sx={{margin:1, backgroundColor: '#4D47C3', color:'white','& .MuiChip-deletable':{backgroundColor: 'white'}}}  key={1} label={formik.values.photo[0].name}  onDelete={() => formik.setFieldValue('attachment', null)} />
                                </div>
                                </div>
                                }
                                {selectedTags.length > 0 && <div className="items-center flex">
                                    <h6 className="font-semibold mt-2 p-2">Tags </h6>
                                     <div className="flex space-x-1 mt-2 overscroll-x-auto max-w-9/10 overflow-x-auto items-center">
                                        {formik.values.tags.map((tag : string, index: number) => {
                                            return (
                                                <Chip sx={{margin:1, backgroundColor: '#4D47C3', color:'white','& .MuiChip-deletable':{backgroundColor: 'white'}}}  key={index} label={tag} onDelete={() => handleTagDeletion(tag)} />
                                            )
                                        })}
                                    </div>
                                </div>}

                            </div>
                            <CardActions className="fixed bottom-0 w-full p-2 z-20 flex">
                                <div className="w-fit flex justify-start">
                                    <FormControlLabel name="isJobPosting"  control={<Checkbox onChange={formik.handleChange} checked={formik.values.isJobPosting}  sx={{color:'#4D47C3','&.Mui-checked': {color: '#4D47C3'},'label':{width: 'fit-content', color: 'red'}}}/>} color='success' label="Job posting"/>
                                    <IconButton disabled={!formik.values.isJobPosting} sx={{marginRight: 50}} onClick={()=> setShowJobSettings(true)}>
                                        <Settings/>
                                    </IconButton>
                                </div>
                                <div className="fixed right-0 bottom-1 flex space-x-1 px-2 justify-end">
                                    <IconButton sx={{display:'flex', justifyContent: 'end'}} onClick={() => setShowTagSelection(true)}>
                                        <Tag/>
                                    </IconButton>
                                    <IconButton component="label" sx={{display:'flex', justifyContent: 'end'}}>
                                        <input hidden name="photo"  onChange={(event) => {
                                            const file: FileList | null = event.currentTarget.files;
                                            if (!file) return;
                                            else {
                                                formik.setFieldValue('photo', file);
                                            }
                                        }}  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                        text/plain, application/pdf, image/*" id="icon-button-file" type="file"/>
                                        <InsertPhoto/>
                                    </IconButton>
                                    <Button
                                        sx={{width: '100px', backgroundColor: '#4D47C3', '&:hover': {backgroundColor: '#4D47C3'}}}
                                        variant="contained"
                                        disableElevation
                                        className={styles.sendButton}
                                        type="submit"
                                    >
                                        <span className={styles.buttonText}>Post</span>
                                        <Send className={styles.sendIcon}/>
                                    </Button>
                                </div>
                            </CardActions>
                        </form>
                    </Card>
                    <div>
                        <TagSelection showModal={showTagSelection} handleModalClose={handleTagSelectionClose} onSelectTag={handleTagsSelection} onDeleteTag={handleTagDeletion} selectedTags={selectedTags}/>
                        <JobSettingsModal showModal={showJobSettings} handleModalClose={()=>setShowJobSettings(false)} values={formik.values.jobSettings} onChange={jobSettingsChangeHandler}/>
                    </div>

                </>

            </Modal>



    );
}

export default NewPostModal;