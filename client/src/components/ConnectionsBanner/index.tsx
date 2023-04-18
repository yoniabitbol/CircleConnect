import {Box, Avatar, Button} from "@mui/material";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";
import getUserProfilePic from "../../http/getUserPicturePic";
import Usertypes from "../../Models/UserProfileModel";
import createNewThread from '../../http/createNewThread';

type ConnectionType = Omit<
  Usertypes,
  | "location"
  | "email"
  | "phone"
  | "website"
  | "backdrop"
  | "summary"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "languages"
  | "awards"
  | "courses"
  | "preferenceTags"
>;


const ConnectionsBanner:React.FC<{connections:any}> = (props) => {
    const {t} = useTranslation();
    const {connections} = props;
    const [userProfilePic, setUserProfilePic] = useState<string[]>();


    useEffect(() => {
        async function fetchUserProfile() {
          const profilePicUrls = await Promise.all(
            connections.map(async (user: ConnectionType) => {
              const profilePicUrl = await getUserProfilePic(user.picture);
    
              return profilePicUrl;
            })
          );
          setUserProfilePic(profilePicUrls);
        }
        fetchUserProfile();
      }, [connections]);
      
    return (
       <div className="pb-5 bg-white w-full drop-shadow-md shadow-purple-500">
           <div className="p-3">
               <h5 className="font-bold">{t('notifications.label.network')}</h5>
               <hr className="w-full bg-gray-400 h-0.5 mt-2"/>
           </div>
           <div className="px-3">
               {connections.slice(0,3).map((connection:ConnectionType, index: number) => {
                   return <Box key={connection.user_id}  sx={{border: 1, borderColor: '#D4D4D4', marginBottom: 1, width: 1, borderRadius:2, padding: 2, display:'flex', alignItems:'center'}}>
                       <Link className=" items-center flex w-4/5 hover:underline" to={`/profile/${connection.user_id}`}>
                           <Avatar sx={{width:50, height:50}}  src={userProfilePic ? userProfilePic[index] : ""}/>
                           <div className="flex-col w-fit">
                               <div className="ml-2 font-bold text-lg">
                                   {connection.name}
                               </div>
                           </div>
                        </Link>
                       <Link to="" onClick={() => {
                           createNewThread(connection.user_id ?? "").then(() => {
                               window.location.href = `/chat/${connection.user_id}`;
                           });
                       }}>
                           <Button
                               sx={{width:'100%', height: 30 }}
                               variant="contained"
                               disableElevation>
                               {t('notifications.buttons.chat')}
                           </Button>
                       </Link>

                   </Box>
                })
               }
           </div>
           <div className="p-2 ml-2">
               <Link to='/network' className="text-[#4D47C3] hover:underline text-sm">{t('notifications.buttons.showAll')} <span>({connections.length})</span></Link>
           </div>

       </div>
    );
};

export default ConnectionsBanner;