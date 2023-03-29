import {Modal, Box, FormControlLabel, Checkbox, TextField, Button} from '@mui/material';
import style from './style.module.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Switch} from '@mui/material';
import {ChangeEvent, FC, useState} from 'react';
import { useTranslation } from "react-i18next";


const JobSettingsModal:FC<{showModal: boolean, handleModalClose: () => void, values: object, onChange: (type:string,value: any) => void}> = (props) => {
    const {t} = useTranslation();

    const {showModal, handleModalClose, onChange} = props;
    const [thirdParty, setThirdParty] = useState<boolean>(false);
    const [thirdPartyLink, setThirdPartyLink] = useState<string | null>(null);
    const [thirdPartyLogo, setThirdPartyLogo] = useState<string | null>(null);
    const [linkSaved, setLinkSaved] = useState<boolean>(false);
    const indeedLogoFile = 'Indeed-Symbol.png'
    const glassdoorLogoFile = 'glassdoor-icon.webp'
    const handleDateChange = ( date: Date | null) => {
        onChange('uploadDeadline',date);
    }

   const handleResumeChange = (event: any) => {
           onChange('isResumeRequired', event.target.checked)
   }

   const handleCoverLetterChange = (event: any) => {
           onChange('isCoverLetterRequired', event.target.checked)
   }

   const handleThirdPartyChange = (event: any) => {
              setThirdParty(event.target.checked);
              if(!event.target.checked){
                    setThirdPartyLink(null);
                    setThirdPartyLogo(null);
                    setLinkSaved(false);
              }
         onChange('isThirdParty', event.target.checked)
   }

   const linkChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setThirdPartyLink(event.target.value);
         if(event.target.value.includes('ca.indeed.com')){
             setThirdPartyLogo(indeedLogoFile);
         }else if(event.target.value.includes('glassdoor.com')){
             setThirdPartyLogo(glassdoorLogoFile);
         }
         else{
                setThirdPartyLogo(null);
         }
   }

   const onLinkSave = () => {
         if(thirdPartyLink && !linkSaved){
              setLinkSaved(true);
         }else if(linkSaved){
              setLinkSaved(false);
         }
         onChange('thirdPartyLink', thirdPartyLink);
   }



    return (
        <Modal open={showModal} onClose={handleModalClose}>
            <Box className={style.box}>
               <h1 className="font-bold">{t('jobPosted.label.jobSettings')}</h1>
                <div className="flex-col justify-items-center mt-5">
                          <FormControlLabel onChange={handleResumeChange}  labelPlacement="start" control={<Switch color="secondary"/>} label={t('jobPosted.label.requireResume')}/>
                          <FormControlLabel onChange={handleCoverLetterChange}  labelPlacement="start" control={<Switch color="secondary"/>} label={t('jobPosted.label.requireCoverLetter')}/>
                    <div className="mt-5 ml-5 flex-col justify-items-center">
                        <h2>{t('jobPosted.label.applicationDeadline')}</h2>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker onChange={handleDateChange}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="mt-6">
                    <FormControlLabel sx={{placeItems:'center'}} onChange={handleThirdPartyChange}  control={<Checkbox sx={{color:'#4D47C3','&.Mui-checked': {color: '#4D47C3'},'label':{width: 'fit-content', color: 'red'}}}/>} color='success' label="Third Party Post"/>
                    <div className="w-full flex">
                        <TextField sx={{width:'70%'}} value={thirdPartyLink ? thirdPartyLink : ''} margin='none' disabled={!thirdParty || linkSaved} onChange={(linkChangeHandler)} type="text" variant="filled" label="Enter 3rd party link"/>
                        <Button disabled={!thirdPartyLink} onClick={onLinkSave}  variant="contained" disableElevation sx={{ml:1,backgroundColor:'#4D47C3', color:'white', '&:hover':{backgroundColor:'#4D47C3'},height:55}}>{linkSaved ? 'Edit' : 'Save'}</Button>
                        {thirdPartyLogo && thirdPartyLink && <img
                            style={{ maxWidth: "5rem", maxHeight: "4rem" }}
                            src={process.env.PUBLIC_URL + "/Third Party Link logos/" + thirdPartyLogo}
                        />}
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default JobSettingsModal;