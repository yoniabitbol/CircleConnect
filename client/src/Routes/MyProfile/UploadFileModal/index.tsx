import {Box, Button, Chip, Modal, Typography} from '@mui/material';
import style from './style.module.css';
import {FC} from 'react';
import {useFormik} from 'formik';

const UploadFileModal: FC<{ open: boolean; onClose: () => void }> = (props) => {
    const {open, onClose} = props;
    const formik = useFormik<{ resume: File | null, coverLetter: File | null }>({
        initialValues: {
            resume: null,
            coverLetter: null,
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <Modal open={open} onClose={onClose} className={style.modal}>
            <Box className={style.box}>
                <div className="bg-white dark:secondary-dark p-3 rounded-lg w-full">
                    <Typography variant="h5" className="text-center">
                        Upload Your Files
                    </Typography>
                    <Typography variant="body1" className="text-center">
                        Upload your resume/CV and cover letter to apply for jobs faster
                    </Typography>
                    <div className="flex w-full mt-2">
                        <div className="w-full h-[10rem] border-dashed border-2">
                            {!formik.values.resume ? (
                                <Button
                                    component={'label'}
                                    sx={{width: '100%', height: '100%'}}
                                    variant="text"
                                >
                                    Upload Resume/CV
                                    <input
                                        hidden
                                        type="file"
                                        name="resume"
                                        onChange={(event) => {
                                            const file: FileList | null = event.currentTarget.files;
                                            if (!file) return;
                                            else {
                                                formik.setFieldValue('resume', file[0]);
                                            }
                                        }}
                                        accept="application/pdf"
                                    />
                                </Button>
                            ) : (
                                <Chip
                                    sx={{width: '100%', height: '100%'}}
                                    label={<div>RESUME: ${formik.values.resume.name} <Typography variant={'h1'}>PDF</Typography></div>}
                                    onDelete={() => formik.setFieldValue('resume', null)}
                                />
                            )}
                        </div>
                        <div className="w-full h-[10rem] border-dashed border-2">
                            {!formik.values.coverLetter ? (
                                <Button
                                    component={'label'}
                                    sx={{width: '100%', height: '100%'}}
                                    variant="text"
                                >
                                    Upload Cover Letter
                                    <input
                                        hidden
                                        type="file"
                                        name="coverLetter"
                                        onChange={(event) => {
                                            const file: FileList | null = event.currentTarget.files;
                                            if (!file) return;
                                            else {
                                                formik.setFieldValue('coverLetter', file[0]);
                                            }
                                        }}
                                        accept="application/pdf"
                                    />
                                </Button>) :( <Chip
                                sx={{width: '100%', height: '100%'}}
                                label={` COVER LETTER: ${formik.values.coverLetter.name}`}
                                onDelete={() => formik.setFieldValue('coverLetter', null)}
                            />)
                            }
                        </div>
                    </div>
                    <div className="flex w-fit"></div>

                    <Button sx={{width: '100%', marginTop: 3}} variant={'contained'}>
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default UploadFileModal;
