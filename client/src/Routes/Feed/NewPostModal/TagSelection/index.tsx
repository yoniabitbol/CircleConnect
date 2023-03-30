import { Modal,Box,Chip} from '@mui/material';
import style from './style.module.css';
import defaultTags from '../../../../lib/Constants/defaultTags';
import React from 'react';


const TagSelection:React.FC<{showModal: boolean, handleModalClose:() => void, onSelectTag: (tag : string) => void, onDeleteTag: (tag : string) => void, selectedTags:string[] | undefined}> = (props) => {
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
                <h1>Tags</h1>
                <input type="text" placeholder="Insert tags" className="w-full h-10 outline-1 focus:outline-none" onKeyDown={handleKeyDown}/>
                <hr className=""/>
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
            </Box>

        </Modal>
    );
};

export default TagSelection;