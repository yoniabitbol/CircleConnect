import FeedContent from './FeedContent';
import UserProfileBanner from '../../components/UserProfileBanner';
import UserBannerSkeleton from '../../components/Skeleton/UserBannerSkeleton';
import NewPostModal from './NewPostModal';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';
import getCurrentUserProfile from '../../http/getCurrentUserProfile';
import getUserProfilePic from '../../http/getUserPicturePic';
import getCurrentUserConnections from '../../http/getCurrentUserConnections';
import getUserBackdrop from '../../http/getUserBackdrop';
import { useEffect, useState } from 'react';
import ConnectionsBanner from '../../components/ConnectionsBanner';
import ConnectionsBannerSkeleton from '../../components/Skeleton/ConnectionsBannerSkeleton';
const Feed = () => {
    const [user, setUser] = useState<any>(null);
    const [userProfilePic, setUserProfilePic] = useState<string>();
    const [userBackdrop, setUserBackdrop] = useState<string>();
    const [userConnections, setUserConnections] = useState<any>(null);
    const [userBannerLoading, setUserBannerLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleModalClose = () => {
        setShowModal(false);
    }
    useEffect(() => {
        getCurrentUserProfile().then((res) => {
            setUser(res.data.user);
            setTimeout(() => {
                setUserBannerLoading(false);
            }, 1000)
        });

    },[])
    useEffect(() => {
        getCurrentUserConnections().then((res) => {
            setUserConnections(res.data.connections);
        })
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
        <div>
            <div className="flex relative max-lg:flex-col-reverse xl:px-[200px] py-10 lg:px-[5rem] md:px-[3rem]" onClick={() =>  {showModal && setShowModal(false)}}>
                <div className="lg:w-[65rem] flex-col justify-center">
                    <div className="w-full flex items-center justify-center">
                        <hr className="w-1/5 bg-[#4D47C3] h-0.5"/>
                        <div className="p-2 w-3/5 flex justify-center">
                            <Button
                                sx={{width: '100%', backgroundColor: '#4D47C3',transition: 'transform 0.6s', ':hover': {backgroundColor: '#3b389b'}, '&:hover':{transitionProperty:'transform', transitionDuration:'0.3s', transform:'scaleX(1.05)'}}}
                                className="block mt-4 w-full px-2 py-3 rounded-lg bg-[#4D47C3] text-white hover:bg-signup-button-hover shadow-xl shadow-placeholder-purple"
                                variant="contained"
                                disableElevation
                                onClick={() => setShowModal(true)}
                            >
                                New Post
                            </Button>
                        </div>
                        <hr className="w-1/5 bg-[#4D47C3] h-0.5"/>
                    </div>
                    <FeedContent/>
                </div>
                <div className="lg:w-[40rem] top-10 p-5">
                    <div className="sticky top-[7rem] flex-col space-y-5">
                        {!userBannerLoading ? <Link to="/myprofile"><UserProfileBanner name={user.name} title={user.title} location={user.location} profilePic={userProfilePic} userBackdrop={userBackdrop}/></Link> : <UserBannerSkeleton/>}
                        <div className="max-lg:hidden">
                            {!userBannerLoading ? <ConnectionsBanner  connections={userConnections}/> : <ConnectionsBannerSkeleton/> }
                        </div>
                    </div>
                </div>
            </div>
            <NewPostModal showModal={showModal} handleModalClose={handleModalClose}/>
        </div>

    );
};

export default Feed;