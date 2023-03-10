import FeedContent from './FeedContent';
import style from './style.module.css';
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
import Usertypes from '../../Models/UserProfileModel';
const Feed = () => {
    const [user, setUser] = useState<Usertypes | null>(null);
    const [userProfilePic, setUserProfilePic] = useState<string>('');
    const [userBackdrop, setUserBackdrop] = useState<string>();
    const [userConnections, setUserConnections] = useState<string[] | null>(null);
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
            <div className="flex relative max-lg:flex-col-reverse xl:px-[200px] py-10 lg:px-[5rem] md:px-[3rem]"
                 onClick={() =>  {showModal && setShowModal(false)}}>
                <div className="lg:w-[65rem] flex-col justify-center">
                    <div className="w-full flex items-center justify-center">
                        <hr className={style.line}/>
                        <div className={style.buttonWrapper}>
                            <Button
                                sx={{backgroundColor: '#4D47C3', '&:hover': {backgroundColor: '#4D47C3'}}}
                                className={style.newPostButton}
                                variant="contained"
                                disableElevation
                                onClick={() => setShowModal(true)}
                            >
                               <span className="">New Post</span>
                            </Button>
                        </div>
                        <hr className={style.line}/>
                    </div>
                    <FeedContent userPic={userProfilePic}/>
                </div>
                <div className="lg:w-[40rem] top-10 p-5">
                    <div className="sticky top-[7rem] flex-col space-y-5">
                        {!userBannerLoading && user ? <Link to="/myprofile">
                            <UserProfileBanner name={user.name} title={user.title} location={user.location}
                              profilePic={userProfilePic} userBackdrop={userBackdrop}/>
                        </Link>
                            : <UserBannerSkeleton/>}
                        <div className="max-lg:hidden">
                            {!userBannerLoading ? <ConnectionsBanner  connections={userConnections}/> :
                                <ConnectionsBannerSkeleton/> }
                        </div>
                    </div>
                </div>
            </div>
            <NewPostModal showModal={showModal} handleModalClose={handleModalClose}/>
        </div>

    );
};

export default Feed;