import {
    Avatar, Button,
    Card,
    CardActions,
    Checkbox, Chip,
    FormControlLabel,
    IconButton,
    Modal,
    Typography,
    Popper, Fade, Box
} from '@mui/material'
import React, {FC, useState} from 'react';
import styles from './style.module.css'
import {InsertPhoto, Settings, Tag, DeleteForever, DisabledByDefault} from '@mui/icons-material';
import {useFormik} from 'formik';
import JobSettingsModal from '../../NewPostModal/JobSettingsModal';
import TagSelection from '../../NewPostModal/TagSelection';
import patchPost from '../../../../http/patchPost';
import deletePost from '../../../../http/deletePost';


const PostModal: FC<{
    open: boolean,
    postInfo: any,
    postSettings: any,
    userInfo: any,
    profilePic: any,
    date: string | undefined,
    onModalClose: () => void,
    editable?: boolean,
    fetchFeed: any,
    postStatus: any,
    image: any,
}> = (props) => {
    const {
        image,
        postStatus,
        editable,
        open,
        userInfo,
        postInfo,
        profilePic,
        date,
        onModalClose,
        postSettings,
        fetchFeed
    } = props;
    const [settings, setSettings] = useState<{
        isResumeRequired: boolean,
        isCoverLetterRequired: boolean,
        uploadDeadline: Date | null,
        thirdPartyLink: string | null,
        position: string | null
    }>({
        isResumeRequired: false,
        isCoverLetterRequired: false,
        uploadDeadline: null,
        thirdPartyLink: null,
        position: null
    });
    const [showJobSettings, setShowJobSettings] = useState<boolean>(false);
    const [showTagSelection, setShowTagSelection] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [openDeletePopper, setOpenDeletePopper] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const formik = useFormik<any>({
        initialValues: {
            text: postInfo.text,
            isJobListing: postSettings.isJobListing,
            isResumeRequired: postSettings.isResumeRequired,
            isCoverLetterRequired: postSettings.isCoverLetterRequired,
            preferenceTags: postSettings.preferenceTags,
            isThirdParty: postSettings.isThirdParty,
            thirdPartyLink: postSettings.thirdPartyLink,
            position: postInfo.position,
        },
        onSubmit: (values) => {
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }
            patchPost(postInfo.id, formData).then((res) => {
                if (res.status === 'success') {
                    onModalClose();
                    postStatus(true, 'Post updated successfully');
                    fetchFeed();
                } else {
                    onModalClose();
                    postStatus(false, 'Something went wrong');
                }
            })


        }
    })
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgColor: 'white',
        padding: 3,
        borderRadius: 5
    };

    const handleDeletePost = () => {
        deletePost(postInfo.id).then((res:any) => {
            console.log(res)
            if (res.status === 200) {
                onModalClose();
                fetchFeed();
                postStatus( true, 'Post deleted successfully');
            } else {
                onModalClose();
                postStatus(false, 'Something went wrong');
            }
        }).catch(()=>{
            postStatus(false, 'Something went wrong');
        })
    }

    const handleDeleteClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenDeletePopper((previousOpen) => !previousOpen);
    };
    const handleTagSelectionClose = () => {
        setShowTagSelection(false);
    }

    const postTextChangeHandler = (event: any) => {
        formik.setFieldValue('text', event.target.value)
    }
    const jobSettingsChangeHandler = (type: string, value: any) => {
        const newSettings = {...settings, [type]: value};
        setSettings(newSettings);
        for (const key in newSettings) {
            if (key === 'uploadDeadline' && newSettings[key] === null) {
                continue;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formik.setFieldValue(key, newSettings[key]);

        }
    }
    const handleTagsSelection = (values: string) => {
        const newTags = selectedTags?.concat(values);
        setSelectedTags(newTags);
        formik.setFieldValue('preferenceTags', newTags);
    }
    const handleTagDeletion = (value: string | undefined) => {
        const newTags = selectedTags?.filter(tag => tag !== value);
        setSelectedTags(newTags);
        formik.setFieldValue('preferenceTags', newTags);
    }
    const handleModalClose = () => {
        onModalClose();
        setOpenDeletePopper(false);
    }
    const disablePostButton = formik.values.text === '' || formik.values.isJobListing && !formik.values.position
    return (
        <Modal open={open} onClose={handleModalClose}>
            <Card className={styles.modal} sx={style}>
                <div className="flex">
                    <Avatar sx={{height: 70, width: 70}} src={profilePic}/>
                    <div
                        className="ml-2 flex-col -space-y-1">
                        <h1 className="font-bold">{userInfo.name}</h1>
                        <div className="flex-col -space-y-3">
                            <h2>{userInfo.title}</h2>
                            <Typography sx={{padding: 0}} variant="caption">{date}</Typography>
                        </div>
                    </div>
                </div>
                {openDeletePopper && <Popper modifiers={[{
                    name: 'arrow',
                    enabled: true,

                }]} sx={{zIndex: 1300}} placement="top" open={openDeletePopper} anchorEl={anchorEl} transition>
                    {({TransitionProps}) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box sx={{border: 1, p: 3, bgcolor: 'white'}}>
                                <h1 className="text-lg">Are you sure you want to delete this post?</h1>
                                <div className="flex justify-end mt-3">
                                    <Button onClick={() => setOpenDeletePopper(false)}>Cancel</Button>
                                    <Button variant="contained" sx={{backgroundColor: 'red'}}
                                            color="error" onClick={handleDeletePost}>Delete</Button>
                                </div>

                            </Box>
                        </Fade>
                    )}
                </Popper>}
                {editable &&
                    <IconButton onClick={handleDeleteClick} sx={{position: 'fixed', top: 0, right: 0, color: 'red'}}>
                        <DeleteForever/>
                    </IconButton>}
                <form onSubmit={formik.handleSubmit}>
                    <input disabled={!editable} className="w-full bg-gray-200 p-2 mt-3 rounded-lg"
                           value={formik.values.text}
                           onChange={postTextChangeHandler}/>
                    {formik.values.image && formik.values.image !== 0 ?
                        <div className="relative">
                            <img className="relative mt-2 z-2" style={{aspectRatio: 16 / 9, objectFit: 'cover'}}
                                 src={URL.createObjectURL(formik.values.image)}/>
                            <div className="text-red-600 absolute right-0 top-1 z-3">
                                <IconButton size="large" onClick={() => formik.setFieldValue('image', 0)}>
                                    <DisabledByDefault sx={{color: 'red', width: 30, height: 30}}/>
                                </IconButton>
                            </div>
                        </div>
                        : image && formik.values.image !== 0 &&
                        <div className="relative">
                            <img className="relative mt-2 z-2" style={{aspectRatio: 16 / 9, objectFit: 'cover'}}
                                 src={image}/>
                            <div className="text-red-600 absolute right-1 top-1 z-3">
                                <IconButton size="large" onClick={() => formik.setFieldValue('image', 0)}>
                                    <DisabledByDefault sx={{color: 'red', width: 30, height: 30}}/>
                                </IconButton>
                            </div>
                        </div>}
                    {formik.values.preferenceTags && formik.values.preferenceTags.length > 0 &&
                        <div className="items-center flex">
                            <h6 className="font-semibold mt-2 p-2">Tags</h6>
                            <div
                                className="flex space-x-1 mt-2 overscroll-x-auto max-w-9/10 overflow-x-auto items-center">
                                {formik.values.preferenceTags.map((tag: string, index: number) => {
                                    return (
                                        <Chip sx={{
                                            margin: 1,
                                            backgroundColor: '#4D47C3',
                                            color: 'white',
                                            '& .MuiChip-deletable': {backgroundColor: 'white'}
                                        }} key={index} label={tag} onDelete={() => handleTagDeletion(tag)}/>
                                    )
                                })}
                            </div>
                        </div>}
                    {editable && <CardActions>
                        <div className="w-fit flex justify-start fixed bottom-1">
                            <FormControlLabel onChange={formik.handleChange} name="isJobListing"
                                              checked={formik.values.isJobListing} control={<Checkbox sx={{
                                color: '#4D47C3',
                                '&.Mui-checked': {color: '#4D47C3'},
                                'label': {width: 'fit-content', color: 'red'}
                            }}/>} color="success" label="Job Listing"/>
                            <IconButton disabled={!formik.values.isJobListing} onClick={() => setShowJobSettings(true)}
                                        sx={{
                                            marginRight: 50,
                                            color: `${formik.values.isJobListing && !formik.values.position && 'red'}`
                                        }}>
                                <Settings/>
                            </IconButton>
                        </div>
                        <div className="fixed right-0 bottom-1 flex space-x-1 px-2 justify-end">
                            <IconButton sx={{display: 'flex', justifyContent: 'end'}}
                                        disabled={!formik.values.isJobListing}
                                        onClick={() => setShowTagSelection(true)}>
                                <Tag/>
                            </IconButton>
                            <IconButton component="label" sx={{display: 'flex', justifyContent: 'end'}}>
                                <input hidden name="image" onChange={(event) => {
                                    const file: FileList | null = event.currentTarget.files;
                                    if (!file) return;
                                    else {
                                        formik.setFieldValue('image', file[0]);
                                    }
                                }} accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                        text/plain, application/pdf, image/*" id="icon-button-file" type="file"/>
                                <InsertPhoto/>
                            </IconButton>
                            <Button
                                disableElevation
                                type="submit"
                                disabled={disablePostButton}
                            >
                                Edit
                            </Button>
                        </div>
                    </CardActions>}
                </form>
                <div>
                    <TagSelection showModal={showTagSelection} handleModalClose={handleTagSelectionClose}
                                  onSelectTag={handleTagsSelection} onDeleteTag={handleTagDeletion}
                                  selectedTags={selectedTags}/>
                    <JobSettingsModal showModal={showJobSettings} handleModalClose={() => setShowJobSettings(false)}
                                      values={{
                                          position: formik.values.position,
                                          uploadDeadline: formik.values.uploadDeadline,
                                          isResumeRequired: formik.values.isResumeRequired,
                                          isCoverLetterRequired: formik.values.isCoverLetterRequired,
                                          isThirdParty: formik.values.isThirdParty,
                                          thirdPartyLink: formik.values.thirdPartyLink
                                      }} onChange={jobSettingsChangeHandler}/>
                </div>
            </Card>
        </Modal>
    );
};

export default PostModal;