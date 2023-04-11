import {
    Avatar, Button,
    Card,
    CardActions,
    Checkbox, Chip,
    FormControlLabel,
    IconButton,
    Modal,
    Typography
} from '@mui/material'
import {FC} from 'react';
import styles from './style.module.css'
import {InsertPhoto, Settings, Tag} from '@mui/icons-material';
import {useFormik} from 'formik';


const PostModal:FC<{open: boolean, postInfo:any, postSettings:any, userInfo:any, profilePic:any, date: string | undefined, onModalClose: () => void}> = (props) => {
    const {open, userInfo,postInfo, profilePic, date, onModalClose, postSettings} = props;
    const formik = useFormik<any>({
        initialValues: {
            text: postInfo.text,
            isJobListing: postSettings.isJobListing,
            isResumeRequired: postSettings.isResumeRequired,
            isCoverLetterRequired: postSettings.isCoverLetterRequired,
            preferenceTags: postSettings.preferenceTags,
            isThirdParty: postSettings.isThirdParty,
            thirdPartyLink: postSettings.thirdPartyLink,
            position: postSettings.position,
        },
        onSubmit: (values) => {
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }


        }
    })
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgColor: 'white',
        padding:3,
        borderRadius:5
    };

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
                <form>
                    <input className="w-full bg-gray-200 p-2 mt-3" value={formik.values.text} onChange={formik.handleChange}/>
                    {formik.values.image && <div className="flex items-center space-x-1">
                        <h6 className="font-semibold mt-2 p-2">Image</h6>
                        <div
                            className="flex space-x-1 mt-2 overscroll-x-auto max-w-9/10 overflow-x-auto items-center">
                            <Chip sx={{
                                margin: 1,
                                backgroundColor: '#4D47C3',
                                color: 'white',
                                '& .MuiChip-deletable': {backgroundColor: 'white'}
                            }} key={1} label={formik.values.image.name}
                                  onDelete={() => formik.setFieldValue('image', null)}/>
                        </div>
                    </div>
                    }
                    <CardActions>
                        <div className="w-fit flex justify-start fixed bottom-1">
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
                                    else {
                                        formik.setFieldValue('image', file[0]);
                                    }
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
                </form>

                </Card>
        </Modal>
    );
};

export default PostModal;