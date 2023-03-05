import * as React from 'react';
import {Card, Modal, CardActions, TextareaAutosize, Button, IconButton, FormControlLabel, Checkbox, Tooltip} from '@mui/material';
import styles from './style.module.css';
import {Send, Videocam, InsertPhoto, AttachFile, Help} from '@mui/icons-material';
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
            initialValues: {postMessage: '', isJobPosting: false, attachment: [], photo: [], video: []},
            onSubmit: (values,{resetForm}) => {
                console.log(values);
                handleModalClose();
                resetForm();

            }
        })
    return (
            <Modal
                open={showModal}
                onClose={handleModalClose}
            >
                <Card className={styles.modal} sx={style}>
                    <div className="w-full sticky top-0 bg-white p-2 z-20">
                        <h6 className="font-bold p-3">NEW POST</h6>
                        <hr className="ml-4 w-9/10 bg-gray-300"/>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-2">
                            <TextareaAutosize name="postMessage" onChange={formik.handleChange} value={formik.values.postMessage} minRows={12} maxRows={12} className="w-full  outline-none relative resize-none" placeholder="Whats on your mind?"/>
                        </div>
                        <CardActions className="fixed bottom-0 flex w-full p-2 z-20">
                            <div className="flex w-1/2 items-center space-x-0">
                                <Tooltip className="max-sm:hidden" title="Checking this will allow users to submit Resumés/CV to apply" sx={{color:'#4D47C3', backgroundColor:'white'}} placement="top">
                                    <Help/>
                                </Tooltip>
                                <FormControlLabel className="w-fit" name="isJobPosting" onChange={formik.handleChange} value={formik.values.isJobPosting}  control={<Checkbox defaultChecked sx={{color:'#4D47C3','&.Mui-checked': {color: '#4D47C3',}}}/>} color='success' label="This is a job posting"/>

                            </div>
                            <div className="absolute right-0 flex w-1/2 space-x-1 px-2 justify-end">
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
            </Modal>



    );
}

export default NewPostModal;