import {useState,FC} from 'react';
import {Card, Modal, CardActions, TextareaAutosize, Button, IconButton, FormControlLabel, Checkbox,Chip} from '@mui/material';
import styles from './style.module.css';
import {Send, InsertPhoto, AttachFile, Tag, Settings, Close} from '@mui/icons-material';
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
    const formik = useFormik({
            initialValues: {postMessage: '', isJobPosting: false, jobSettings: { isResumeRequired:false, isCoverLetterRequired:false, applicationDeadline: null}, tags:[], attachment: [], photo: []},
            onSubmit: (values,{resetForm}) => {
                console.log(values);
                handleModalClose();
                resetForm();

            }
        })
    const [showTagSelection, setShowTagSelection] =useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[] | undefined>([]);
    const [showJobSettings, setShowJobSettings] = useState<boolean>(false);
    const [settings, setSettings] = useState<{isResumeRequired: boolean, isCoverLetterRequired: boolean, applicationDeadline: Date | null}>({isResumeRequired: false, isCoverLetterRequired: false, applicationDeadline: null});
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
                            <div className="p-2">
                                <TextareaAutosize name="postMessage" onChange={formik.handleChange} value={formik.values.postMessage} minRows={10} maxRows={10} className="w-full  outline-none relative resize-none" placeholder="Whats on your mind?"/>
                                {selectedTags !== undefined && <div className="flex space-x-1 mt-2 overscroll-x-auto max-w-9/10 overflow-x-auto">
                                    {selectedTags.map((tag, index) => {
                                        return (
                                            <Chip sx={{margin:1, backgroundColor: '#4D47C3', color:'white','& .MuiChip-deletable':{backgroundColor: 'white'}}}  key={index} label={tag} onDelete={() => handleTagDeletion(tag)} />
                                        )
                                    })}
                                </div>
                                    }
                            </div>
                            <CardActions className="fixed bottom-0 w-full p-2 z-20 flex">
                                <div className="w-fit flex">
                                    <FormControlLabel name="isJobPosting"  control={<Checkbox onChange={formik.handleChange} checked={formik.values.isJobPosting}  sx={{color:'#4D47C3','&.Mui-checked': {color: '#4D47C3'},'label':{width: 'fit-content', color: 'red'}}}/>} color='success' label="Job posting"/>
                                    <IconButton disabled={!formik.values.isJobPosting} onClick={()=> setShowJobSettings(true)}>
                                        <Settings/>
                                    </IconButton>
                                </div>
                                <div className="fixed right-0 bottom-1 flex space-x-1 px-2 justify-end max-[450px]:flex-col">
                                    <IconButton sx={{display:'flex', justifyContent: 'end'}} onClick={() => setShowTagSelection(true)}>
                                        <Tag/>
                                    </IconButton>
                                    <IconButton component="label" sx={{display:'flex', justifyContent: 'end'}}>
                                        <input hidden name="attachment" onChange={formik.handleChange} value={formik.values.attachment} accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                        text/plain, application/pdf, image/*" id="icon-button-file" type="file"/>
                                        <AttachFile/>
                                    </IconButton>
                                    <IconButton component="label" sx={{display:'flex', justifyContent: 'end'}}>
                                        <input hidden accept="image/*"  type="file" name="photo" value={formik.values.photo} onChange={formik.handleChange}/>
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