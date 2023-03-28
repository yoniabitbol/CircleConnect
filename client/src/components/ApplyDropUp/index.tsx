import {FC, useState, MouseEvent, useEffect} from 'react';
import {Button, Menu,  Typography} from '@mui/material';;
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {UploadFile, FileCopy, CheckCircleRounded} from '@mui/icons-material';
import {useFormik} from 'formik';
import applyToPost from '../../http/applyToPost';


const ApplyDropUp:FC<{postSettings: any, postId: string}> = (props) => {
    const {postSettings, postId} = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [canApply, setCanApply] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const checkIfCanApply = () => {
        if(postSettings.isResumeRequired && !formik.values.applicationResume) {
            return false;
        }
        if(postSettings.isCoverLetterRequired && !formik.values.applicationCoverLetter) {
            return false;
        }
        return true;
    }
    const isDeadlinePassed = () => {
        const deadline = new Date(postSettings.uploadDeadline);
        const today = new Date();
        return deadline < today;
    }

    const formik = useFormik<any>({
        initialValues: {existingInfo: false, applicationResume: null, applicationCoverLetter: null},
        onSubmit: (values,{resetForm}) => {
            console.log(values)
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }
            applyToPost(postId,formData);
            handleClose();
            resetForm();
        }
    })
    useEffect(() => {
        setCanApply(checkIfCanApply);
    }, [formik.values])
    return (
        <div>
            <div className="flex items-center space-x-2">
                <Button
                    disabled={isDeadlinePassed()}
                    sx={{backgroundColor:'#4D47C3', ':hover':{backgroundColor:'#4D47C3'},  '&:hover':{transitionProperty:'transform', transitionDuration:'0.3s', transform:'scale(1.02)',  filter: 'drop-shadow(0px 0px 2px #6947C3)'}}}
                    variant="contained"
                    component='label'
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}>
                    Apply
                </Button>
            </div>
            <Menu
                id="demo-customized-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                    <div className="h-[25rem] sm:w-[30rem] w-[21rem] px-1 flex-col justify-center">
                            <h1 className="font-bold py-2 text-center text-2xl">Upload new Resume/CV</h1>
                        <form className="flex-col" onSubmit={formik.handleSubmit}>
                            <div className="flex items-center w-full">
                                <Button  component='label' variant='text' sx={{ color:'black',fontSize: 15, '&:hover':{backgroundColor: '#615cc1', color:'white' }}}>
                                    <UploadFile  />
                                    Upload  CV
                                    <input accept="application/msword, application/pdf" hidden type="file" onChange={(event) => {
                                        const file: FileList | null = event.currentTarget.files;
                                        if (!file) return;
                                        else {
                                            formik.setFieldValue('applicationResume', file[0]);
                                        }
                                    }}/>
                                </Button>
                                {postSettings.isResumeRequired && !formik.values.applicationResume && <span className="items-center absolute right-2 text-red-400">Required</span>}
                                <div className="items-center absolute right-2 text-red-400">
                                    {formik.values.applicationResume && <CheckCircleRounded sx={{color: '#0dcc0f'}}/>}
                                </div>
                            </div>
                           <div className="flex items-center w-full">
                               <Button component='label' variant='text' sx={{ color:'black',fontSize: 15, '&:hover':{backgroundColor: '#615cc1', color:'white' }}}>
                                   <UploadFile  />
                                   Upload Cover Letter
                                   <input accept="application/msword, application/pdf" hidden type="file" onChange={(event) => {
                                       const file: FileList | null = event.currentTarget.files;
                                       if (!file) return;
                                       else {
                                           formik.setFieldValue('applicationCoverLetter', file[0]);
                                       }
                                   }}/>
                               </Button>
                               {postSettings.isCoverLetterRequired && !formik.values.applicationCoverLetter && <span className="items-center absolute right-2 text-red-400">Required</span>}
                               <div className="items-center absolute right-2 text-red-400">
                                   {formik.values.applicationCoverLetter && <CheckCircleRounded sx={{color: '#0dcc0f'}}/>}
                               </div>
                           </div>
                            <Button disabled={!canApply} sx={{marginTop:2,fontSize: 20, width:'100%', backgroundColor:`${canApply ? '#4D47C3' : 'gray'}`,color:'white', '&:hover':{backgroundColor: '#3a32c2'}}} variant="text" type="submit">
                                Apply
                            </Button>
                        </form>


                        <Typography sx={{height:'20%',fontSize: 30, color:'gray', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center', marginTop:3}}>
                            OR
                        </Typography>
                        <Button variant='text' sx={{marginTop:2,fontSize: 17, width:'100%', backgroundColor:'#4D47C3',color:'white', '&:hover':{backgroundColor: '#3a32c2'}}}>
                            <FileCopy />
                            Apply With Existing Resume
                        </Button>
                    </div>

            </Menu>
        </div>
    );
}

export default ApplyDropUp;