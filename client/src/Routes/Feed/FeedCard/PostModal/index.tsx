import {
    Avatar, Button,
    Card,
    CardActions,
    Checkbox,
    FormControlLabel,
    IconButton,
    Modal,
    Typography
} from '@mui/material'
import {FC, useEffect, useState} from 'react';
import styles from './style.module.css'
import {InsertPhoto, Settings, Tag} from '@mui/icons-material';


const PostModal:FC<{open: boolean, postInfo:any, postSettings:any, userInfo:any, profilePic:any, date: string | undefined, onModalClose: () => void}> = (props) => {
    const {open, userInfo,postInfo, profilePic, date, onModalClose} = props;
    const [postText, setPostText] = useState<string>(postInfo.text)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgColor: 'white',
        padding:3,
        borderRadius:5
    };
    const resetValues = () => {
        setPostText(postInfo.text)
    }

    useEffect(() => {
        resetValues()
    },[onModalClose])

    const postTextChangeHandler =(event: any) => {
        setPostText(event.target.value)
    }
    return (
        <Modal open={open} onClose={onModalClose}>
            <Card className={styles.modal} sx={style}>
                <div className="flex">
                    <Avatar sx={{height:70, width:70}} src={profilePic}/>
                    <div
                        className="ml-2 flex-col -space-y-1">
                        <h1 className="font-bold">{userInfo.name}</h1>
                        <div className="flex-col -space-y-3">
                            <h2>{userInfo.title}</h2>
                            <Typography sx={{padding:0}} variant="caption">{date}</Typography>
                        </div>
                </div>
                    </div>
                <input className="w-full bg-gray-200 p-2 mt-3" value={postText} onChange={postTextChangeHandler}/>
                <CardActions>
                    <div className="w-fit flex justify-start">
                        <FormControlLabel name="isJobListing"  control={<Checkbox  sx={{color:'#4D47C3','&.Mui-checked': {color: '#4D47C3'},'label':{width: 'fit-content', color: 'red'}}}/>} color='success' label='Job Listing'/>
                        <IconButton sx={{marginRight: 50}}>
                            <Settings/>
                        </IconButton>
                    </div>
                    <div className="fixed right-0 bottom-1 flex space-x-1 px-2 justify-end">
                        <IconButton  sx={{display:'flex', justifyContent: 'end'}}>
                            <Tag/>
                        </IconButton>
                        <IconButton component="label" sx={{display:'flex', justifyContent: 'end'}}>
                            <input hidden name="image"  onChange={(event) => {
                                const file: FileList | null = event.currentTarget.files;
                                if (!file) return;
                            }}  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                        text/plain, application/pdf, image/*" id="icon-button-file" type="file"/>
                            <InsertPhoto/>
                        </IconButton>
                        <Button
                        >
                           Edit
                        </Button>
                    </div>
                </CardActions>
                </Card>
        </Modal>
    );
};

export default PostModal;