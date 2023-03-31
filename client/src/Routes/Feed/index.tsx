import FeedContent from './FeedContent';
import style from './style.module.css';
import UserProfileBanner from '../../components/UserProfileBanner';
import UserBannerSkeleton from '../../components/Skeleton/UserBannerSkeleton';
import NewPostModal from './NewPostModal';
import { Link } from 'react-router-dom';
import {Alert, Button, Snackbar} from '@mui/material';
import getCurrentUserProfile from '../../http/getCurrentUserProfile';
import getUserProfilePic from '../../http/getUserPicturePic';
import getCurrentUserConnections from '../../http/getCurrentUserConnections';
import getUserBackdrop from '../../http/getUserBackdrop';
import { useEffect, useState } from 'react';
import ConnectionsBanner from '../../components/ConnectionsBanner';
import ConnectionsBannerSkeleton from '../../components/Skeleton/ConnectionsBannerSkeleton';
import Usertypes from '../../Models/UserProfileModel';
import getSocialFeed from '../../http/getSocialFeed';
import getJobFeed from '../../http/getJobFeed';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Feed = () => {
    const {t} = useTranslation();
    const [user, setUser] = useState<Usertypes | null>(null);
    const [userProfilePic, setUserProfilePic] = useState<string>('');
    const [userBackdrop, setUserBackdrop] = useState<string>();
    const [userConnections, setUserConnections] = useState<string[] | null>(null);
    const [userBannerLoading, setUserBannerLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [feedData, setFeedData] = useState<any>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [postStatus,setPostStatus] = useState<boolean>(false);
    const handleModalClose = () => {
        setShowModal(false);
    }
    const location = useLocation();
    useEffect(() => {
        getCurrentUserProfile().then((res) => {
            setUser(res.data.user);
            setTimeout(() => {
                setUserBannerLoading(false);
            }, 1000)
        });

    },[])
    const fetchFeed = () => {
        if(location.pathname === '/feed') {
            getSocialFeed().then((res) => {
                setFeedData(res.data);
            });
        }else if(location.pathname === '/jobs') {
            getJobFeed().then((res) => {
                setFeedData(res.data);
            });
        }
    }
    useEffect(() => {

       fetchFeed();

    },[location])
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

    const isPostedSuccess = (value : boolean) => {
        if(value){
            setPostStatus(true);
        }else
            setPostStatus(false);
        setShowAlert(true);


    }

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
                               <span className="">{t('notifications.buttons.newPost')}</span>
                            </Button>
                        </div>
                        <hr className={style.line}/>
                    </div>
                    <FeedContent feedData={feedData} userPic={userProfilePic}/>
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
            <NewPostModal showModal={showModal} handleModalClose={handleModalClose} fetchFeed={fetchFeed} postStatus={isPostedSuccess}/>
            <Snackbar anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} open={showAlert} autoHideDuration={6000} onClose={()=> setShowAlert(false)}>
                <Alert severity={postStatus ? "success" : "error"} >{postStatus ? 'Post Posted Successfully' : 'Oops! There was an error'}</Alert>
            </Snackbar>
        </div>

    );
};

export default Feed;