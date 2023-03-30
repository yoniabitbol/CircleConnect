import {Box, Avatar, Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from 'react';
const ConnectionsBanner:React.FC<{connections:any}> = (props) => {
    const {connections} = props;
    return (
       <div className="pb-5 bg-white w-full drop-shadow-md shadow-purple-500">
           <div className="p-3">
               <h5 className="font-bold">My Network</h5>
               <hr className="w-full bg-gray-400 h-0.5 mt-2"/>
           </div>
           <div className="px-3">
               {connections.slice(0,3).map((connection:any) => {
                   return <Box key={connection._id}  sx={{border: 1, borderColor: '#D4D4D4', marginBottom: 1, width: 1, borderRadius:2, padding: 2, display:'flex', alignItems:'center'}}>
                       <Link className=" items-center flex w-4/5 hover:underline" to={`/profile/${connection.user_id}`}>
                           <Avatar sx={{width:50, height:50}}  src={connection.picture}/>
                           <div className="flex-col w-fit">
                               <div className="ml-2 font-bold text-lg">
                                   {connection.name}
                               </div>
                           </div>
                        </Link>
                       <Link to="/chat">
                           <Button
                               sx={{width:'100%', height: 30 }}
                               variant="contained"
                               disableElevation={true}
                              >
                               Chat
                           </Button>
                       </Link>

                   </Box>
                })
               }
           </div>
           <div className="p-2 ml-2">
               <Link to='/network' className="text-[#4D47C3] hover:underline text-sm">SHOW ALL <span>({connections.length})</span></Link>
           </div>

       </div>
    );
};

export default ConnectionsBanner;