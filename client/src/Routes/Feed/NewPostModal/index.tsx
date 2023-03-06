import * as React from 'react';
import {Card, Modal, CardActions, TextareaAutosize, Button, IconButton, FormControlLabel, Checkbox, Tooltip,Chip} from '@mui/material';
import styles from './style.module.css';
import {Send, Videocam, InsertPhoto, AttachFile, Help, Tag} from '@mui/icons-material';
import TagSelection from './TagSelection';
import {useFormik} from 'formik';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgColor: 'white',
};



const NewPostModal:React.FC<{showModal: boolean, handleModalClose:()=>void}> = (props) => {
    const {showModal, handleModalClose} = props;
    const formik = useFormik({
            initialValues: {postMessage: '', isJobPosting: false,tags:[], attachment: [], photo: [], video: []},
            onSubmit: (values,{resetForm}) => {
                console.log(values);
                handleModalClose();
                resetForm();

            }
        })
    const [showTagSelection, setShowTagSelection] = React.useState<boolean>(false);
    const [selectedTags, setSelectedTags] = React.useState<string[] | undefined>([]);
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
    return (
            <Modal
                open={showModal}
                onClose={resetTags}
            >
                <>
                    <Card className={styles.modal} sx={style}>
                        <div className="w-full sticky top-0 bg-white p-2 z-20">
                            <h6 className="font-bold p-3">NEW POST</h6>
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
                            <CardActions className="fixed bottom-0 flex w-full p-2 z-20">
                                <div className="flex w-1/3 items-center space-x-0">
                                    <Tooltip title="Checking this will allow users to submit Resumés/CV to apply" className={styles.tooltip} placement="top">
                                        <Help/>
                                    </Tooltip>
                                    <FormControlLabel name="isJobPosting" onChange={formik.handleChange} value={formik.values.isJobPosting}  control={<Checkbox defaultChecked sx={{color:'#4D47C3','&.Mui-checked': {color: '#4D47C3'},'label':{width: 'fit-content', color: 'red'}}}/>} color='success' label="Job posting"/>
                                </div>
                                <div className="absolute right-0 flex w-1/2 space-x-1 px-2 justify-end">
                                    <IconButton onClick={() => setShowTagSelection(true)}>
                                        <Tag/>
                                    </IconButton>
                                    <IconButton component="label">
                                        <input hidden name="attachment" onChange={formik.handleChange} value={formik.values.attachment} accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                        text/plain, application/pdf, image/*" id="icon-button-file" type="file"/>
                                        <AttachFile/>
                                    </IconButton>
                                    <IconButton component="label">
                                        <input hidden accept="image/*"  type="file" name="photo" value={formik.values.photo} onChange={formik.handleChange}/>
                                        <InsertPhoto/>
                                    </IconButton>
                                    <IconButton component="label">
                                        <input hidden accept="video/*"  type="file" name="video" value={formik.values.video} onChange={formik.handleChange}/>
                                        <Videocam/>
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
                    </div>

                </>

            </Modal>



    );
}

export default NewPostModal;