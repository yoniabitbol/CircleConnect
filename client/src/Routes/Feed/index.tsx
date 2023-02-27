import FeedContent from './FeedContent';
import UserProfileBanner from '../../components/UserProfileBanner';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';
import getCurrentUserProfile from '../../http/getCurrentUserProfile';
import getUserProfilePic from '../../http/getUserPicturePic';
import getUserBackdrop from '../../http/getUserBackdrop';
import { useEffect, useState } from 'react';
const Feed = () => {
    const [user, setUser] = useState<any>(null);
    const [userProfilePic, setUserProfilePic] = useState<string>();
    const [userBackdrop, setUserBackdrop] = useState<string>();
    useEffect(() => {
        getCurrentUserProfile().then((res) => {
            setUser(res.data.user);
        });
    },[])
    useEffect(() => {
        if (user) {
            getUserProfilePic(user.picture).then((res) => {
                setUserProfilePic(res);
            });
            getUserBackdrop(user.backdrop).then((res) => {
                setUserBackdrop(res);
            })
        }
    },[user])
    return (
        <div className="flex max-lg:flex-col-reverse xl:px-[300px] py-10 lg:px-[8rem]">
            <div className="w-full flex-col justify-center">
                <div className="w-full flex items-center">
                    <hr className="w-1/5 bg-[#4D47C3] h-0.5"/>
                    <div className="p-2 w-full">
                        <Button
                            sx={{width: '100%', backgroundColor: '#4D47C3', ':hover': {backgroundColor: '#4D47C3'}}}
                            variant="contained"
                            disableElevation>
                            New Post
                        </Button>
                    </div>
                    <hr className="w-1/5 bg-[#4D47C3] h-0.5"/>
                </div>

                <FeedContent/>
            </div>
            <div className="lg:w-[40rem] p-5">
                {user && <Link to="/myprofile"><UserProfileBanner name={user.name} title={user.title} location={user.location} profilePic={userProfilePic} userBackdrop={userBackdrop}/></Link>}            </div>
        </div>
    );
};

export default Feed;