import { Modal,Box,Chip} from '@mui/material';
import style from './style.module.css';
import defaultTags from '../../../../lib/Constants/defaultTags';
import React from 'react';
import { useTranslation } from "react-i18next";


const TagSelection:React.FC<{showModal: boolean, handleModalClose:() => void, onSelectTag: (tag : string) => void, onDeleteTag: (tag : string) => void, selectedTags:string[] | undefined}> = (props) => {
    const {t} = useTranslation();
    const {showModal, handleModalClose, onSelectTag, onDeleteTag, selectedTags} = props;
    const handleTagSelection = (value : string) => {
        onSelectTag(value);
    }
    const handleTagDeletion = (value: string) => {
        onDeleteTag(value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleTagSelection(e.currentTarget.value);
            e.currentTarget.value = '';
        }
    }
    return (
        <Modal open={showModal}
        onClose={handleModalClose}
               sx={{overflow:'scroll'}}
        >
            <Box className={style.box}>
                <div className="bg-white dark:secondary-dark p-[20px] rounded-[1rem]">
                    <h1>{t('userProfile.label.tags')}</h1>
                    <input type="text" placeholder="Insert tags" className="w-full h-10 outline-1 focus:outline-none dark:secondary-dark" onKeyDown={handleKeyDown}/>
                    <hr className=""/>
                    {selectedTags?.length === 0 && <p className="text-red-500 mt-2">One tag minimum if job posting</p>}
                    <div className="mt-4">
                        {selectedTags && selectedTags.map((tag, index) => {
                            return (
                                <Chip key={index} label={tag} sx={{margin:1, backgroundColor: '#4D47C3', color:'white','& .MuiChip-deletable':{backgroundColor: 'white'}}} onDelete={()=>handleTagDeletion(tag)}/>
                            )
                        })
                        }
                    </div>
                    {defaultTags.map((tag, index) => {
                        {if(selectedTags?.includes(tag)) return}
                        return (
                            <Chip key={index} label={tag} sx={{margin:1}} onClick={() => handleTagSelection(tag)}/>
                        )
                    })
                    }
                </div>

            </Box>

        </Modal>
    );
};

export default TagSelection;