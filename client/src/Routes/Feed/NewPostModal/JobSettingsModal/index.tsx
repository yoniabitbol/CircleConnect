import {Modal, Box, FormControlLabel, Checkbox, TextField, Button, Autocomplete, Typography} from '@mui/material';
import style from './style.module.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Switch} from '@mui/material';
import {ChangeEvent, FC, useState} from 'react';


const jobPositions = [
    {label: 'Software Engineer', value: 'Software Engineer'},
    {label: 'Software Developer', value: 'Software Developer'},
    {label: 'Full Stack Developer', value: 'Full Stack Developer'},
    {label: 'Front End Developer', value: 'Front End Developer'},
    {label: 'Back End Developer', value: 'Back End Developer'},
    {label: 'Data Scientist', value: 'Data Scientist'},
    {label: 'Data Analyst', value: 'Data Analyst'},
    {label: 'Data Engineer', value: 'Data Engineer'},
    {label: 'Machine Learning Engineer', value: 'Machine Learning Engineer'},
    {label: 'Product Manager', value: 'Product Manager'},
    {label: 'Product Designer', value: 'Product Designer'},
    {label: 'Product Marketer', value: 'Product Marketer'},
    {label: 'Product Analyst', value: 'Product Analyst'},
    {label: 'Product Owner', value: 'Product Owner'},
    {label: 'Business Analyst', value: 'Business Analyst'},
    {label: 'Business Developer', value: 'Business Developer'},
    {label: 'Business Manager', value: 'Business Manager'},
    {label: 'Business Owner', value: 'Business Owner'},
    {label: 'Business Consultant', value: 'Business Consultant'},
    {label: 'Business Strategist', value: 'Business Strategist'},


]



const JobSettingsModal:FC<{showModal: boolean, handleModalClose: () => void, values: object, onChange: (type:string,value: any) => void}> = (props) => {
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

   const handleJobPositionChange = (_ : any,value : any) => {
         onChange('position', value);
   }

    return (
        <Modal open={showModal} onClose={handleModalClose}>
            <Box className={style.box}>
               <h1 className="font-bold">Job Posting Settings</h1>
                <div className="flex-col justify-items-center mt-5">
                    <div className="flex items-center space-x-3">
                        <Autocomplete sx={{width:'50%'}} options={jobPositions}  onInputChange={handleJobPositionChange}  freeSolo={true} renderInput={(params) => <TextField {...params} label="Job Postion" />}/>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{width: '50%', marginBottom: 1}} components={['DatePicker']}>
                                <DatePicker label="Application Deadline" disablePast={true} onChange={handleDateChange}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className="mt-4 border-t-2 border-b-2 flex space-x-[5rem]">
                        <FormControlLabel onChange={handleResumeChange}  labelPlacement="start" control={<Switch color="secondary"/>} label={<Typography>Require CV</Typography>}/>
                        <FormControlLabel onChange={handleCoverLetterChange}  labelPlacement="start" control={<Switch color="secondary"/>} label="Require Cover Letter"/>
                    </div>
                </div>
                <div className="mt-6">
                    <FormControlLabel sx={{placeItems:'center'}} onChange={handleThirdPartyChange}  control={<Checkbox sx={{color:'#4D47C3','&.Mui-checked': {color: '#4D47C3'},'label':{width: 'fit-content', color: 'red'}}}/>} color='success' label="Third Party Post"/>
                    <div className="w-full flex">
                        <TextField sx={{width:'70%'}} value={thirdPartyLink ? thirdPartyLink : ''} margin='none' disabled={!thirdParty || linkSaved} onChange={(linkChangeHandler)} type="text" variant="filled" label="Enter 3rd party link"/>
                        <Button disabled={!thirdPartyLink} onClick={onLinkSave}  variant="contained" disableElevation sx={{ml:1,backgroundColor:'#4D47C3', color:'white', '&:hover':{backgroundColor:'#4D47C3'},height:55}}>{linkSaved ? 'Edit Link' : 'Save Link'}</Button>
                        {thirdPartyLogo && thirdPartyLink && <img
                            style={{ maxWidth: "5rem", maxHeight: "4rem" }}
                            src={process.env.PUBLIC_URL + "/Third Party Link logos/" + thirdPartyLogo}
                        />}
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