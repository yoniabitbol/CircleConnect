import {Modal, Box, FormControlLabel} from '@mui/material';
import style from './style.module.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Switch} from '@mui/material';
import { FC} from 'react';




const JobSettingsModal:FC<{showModal: boolean, handleModalClose: () => void, values: object, onChange: (type:string,value: any) => void}> = (props) => {
    const {showModal, handleModalClose, onChange} = props;

    const handleDateChange = ( date: Date | null) => {
        onChange('uploadDeadline',date);
    }

   const handleResumeChange = (event: any) => {
           onChange('isResumeRequired', event.target.checked)
   }

   const handleCoverLetterChange = (event: any) => {
           onChange('isCoverLetterRequired', event.target.checked)
   }

    return (
        <Modal  open={showModal} onClose={handleModalClose}>
            <Box className={style.box}>
               <h1 className="font-bold">Job Posting Settings</h1>
                <div className="flex-col justify-items-center mt-5">
                          <FormControlLabel onChange={handleResumeChange}  labelPlacement="start" control={<Switch color="secondary"/>} label="Require Resumé/CV"/>
                          <FormControlLabel onChange={handleCoverLetterChange}  labelPlacement="start" control={<Switch color="secondary"/>} label="Require Cover Letter"/>
                    <div className="mt-5 ml-5 flex-col justify-items-center">
                        <h2>Application Deadline</h2>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker onChange={handleDateChange}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>


            </Box>
        </Modal>
    );
};

export default JobSettingsModal;