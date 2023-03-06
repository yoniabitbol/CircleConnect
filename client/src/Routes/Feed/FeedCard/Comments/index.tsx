import {Avatar, IconButton} from '@mui/material';
import {MapsUgc} from '@mui/icons-material';
import React from 'react';

const Comments:React.FC<{userPic:any}> = (props) => {
    const {userPic} = props;
    return (
        <div className="p-3">
            <div className="flex items-center">
                <Avatar src={userPic}/>
                <div className="flex items-center ml-3 w-full border-slate-100 border-2 rounded-2xl">
                <input className="w-full p-3 outline-none " placeholder="Share your thoughts"/>
                    <IconButton>
                    <MapsUgc sx={{color: '#4D47C3'}}/>
                    </IconButton>
                </div>
            </div>
            <div className="flex-col mt-3 overflow-y-scroll max-h-[25rem]">
                <div className="flex mt-5">
                    <Avatar/>
                    <div className="ml-3 bg-[#4D47C3] w-full rounded-xl p-2">
                        <h1 className="font-bold text-white">Reuven Ostrofsky</h1>
                        <h2 className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </h2>
                    </div>
                </div>
                <div className="flex mt-5">
                    <Avatar/>
                    <div className="ml-3 bg-[#4D47C3] w-full rounded-xl p-2">
                        <h1 className="font-bold text-white">Reuven Ostrofsky</h1>
                        <h2 className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </h2>
                    </div>
                </div>

            </div>
            </div>
    );
};

export default Comments;