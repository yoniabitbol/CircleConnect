import * as React from 'react';
import {Grow,Card, Modal, CardActions, TextareaAutosize, Button, IconButton, FormControlLabel, Checkbox, Tooltip} from '@mui/material';
import styles from './style.module.css';
import {Send, Videocam, InsertPhoto, AttachFile, Help} from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '25%',
    left: '25%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height:300,
    bgColor: 'white',
};

const NewPostModal:React.FC<{showModal: boolean, handleModalClose:()=>void}> = (props) => {
    const {showModal, handleModalClose} = props;
    return (

                <Modal
                    open={showModal}
                    onClose={handleModalClose}>
                    <Grow in={showModal} >
                    <Card className={styles.modal} sx={style}>
                        <div className="w-full sticky top-0 bg-white p-2 z-20">
                            <h6 className="font-bold p-3">NEW POST</h6>
                            <hr className="ml-4 w-9/10 bg-gray-300"/>
                        </div>
                        <div className="p-2">
                            <TextareaAutosize minRows={7} maxRows={7} className="w-full  outline-none relative resize-none" placeholder="Whats on your mind?"/>
                        </div>
                        <CardActions className="fixed bottom-0 w-full p-2 z-20">
                            <FormControlLabel  control={<Checkbox defaultChecked sx={{color:'#4D47C3','&.Mui-checked': {color: '#4D47C3',}}}/>} color='success' label="This is a job posting"/>
                            <Tooltip title="Checking this will allow users to submit Resumés/CV to apply" sx={{color:'#4D47C3', backgroundColor:'white'}} placement="top">
                                <Help/>
                            </Tooltip>
                            <div className="absolute right-0 flex space-x-1.5 px-2">
                                <IconButton>
                                    <AttachFile/>
                                </IconButton>
                                <IconButton>
                                    <InsertPhoto/>
                                </IconButton>
                                <IconButton>
                                    <Videocam/>
                                </IconButton>
                                <Button
                                    sx={{width: 'fit', backgroundColor: '#4D47C3', '&:hover': {backgroundColor: 'white'}}}
                                    variant="contained"
                                    disableElevation
                                    className={styles.sendButton}
                                >
                                    <Send className={styles.sendIcon}/>
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                    </Grow>
                </Modal>


    );
}

export default NewPostModal;