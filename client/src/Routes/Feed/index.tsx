import FeedContent from './FeedContent';
import style from './style.module.css';
import UserProfileBanner from '../../components/UserProfileBanner';
import UserBannerSkeleton from '../../components/Skeleton/UserBannerSkeleton';
import NewPostModal from './NewPostModal';
import FilterCard from './FilterCard';
import { Link, useLocation } from 'react-router-dom';
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
import { useTranslation } from "react-i18next";


const Feed = () => {
    const {t} = useTranslation();
    const [user, setUser] = useState<Usertypes | null>(null);
    const [userProfilePic, setUserProfilePic] = useState<string>('');
    const [userBackdrop, setUserBackdrop] = useState<string>();
    const [userConnections, setUserConnections] = useState<string[] | null>(null);
    const [userBannerLoading, setUserBannerLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [initialFeedData, setInitialFeedData] = useState<any>(null);
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
        setFeedData(null)
        if(location.pathname === '/feed') {
            //set timeout

            getSocialFeed().then((res) => {
               setInitialFeedData(res.data);
               setTimeout(() => {
                     setFeedData(res.data);
               },1000)
            });
        }else if(location.pathname === '/jobs') {
            setFeedData(null)
            getJobFeed().then((res) => {
                if(res.status ==='success'){
                   setInitialFeedData(res.data);
                     setTimeout(() => {
                        setFeedData(res.data);
                     },1000)
                }
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
            }).catch(() => {
                setUserProfilePic('');
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

    const isDeadlinePassed = (date : any) => {
        const deadline = new Date(date);
        const today = new Date();
        return deadline <= today;
    };

    let emptyFilter : boolean;
    const isFilterEmpty = (filter : any) => {
        return filter.tags && filter.tags.length === 0 && !filter.beforeDeadline && !filter.resumeOptional && !filter.coverLetterOptional && filter.jobPosition && filter.jobPosition.length === 0;
    }
    const handleOnApplyFilter = (filter : any) => {
        emptyFilter = isFilterEmpty(filter);
        //remove filter if empty object
        if(emptyFilter || emptyFilter === undefined){
            fetchFeed();
            return;
        }
        let filteredFeed  = initialFeedData
        //filter feed where it contains one of the tags
        if (filter.tags.length > 0){
            filteredFeed = filteredFeed.filter((post : any) => {
                return post.preferenceTags.some((tag : string) => filter.tags.includes(tag))
            })
        }
        if(filter.beforeDeadline){
            filteredFeed = filteredFeed.filter((post : any) => {
                   return !post.uploadDeadline || !isDeadlinePassed(post.uploadDeadline)
            })
        }
         if(filter.jobPosition && filter.jobPosition.length > 0){
            filteredFeed = filteredFeed.filter((post : any) => {
                return filter.jobPosition.includes(post.position)
            })
         }
         if(filter.resumeOptional){
            filteredFeed = filteredFeed.filter((post : any) => {
                return post.isResumeRequired !== filter.resumeOptional
            })
         }
        if(filter.coverLetterOptional){
            filteredFeed = filteredFeed.filter((post : any) => {
                return post.isCoverLetterRequired !== filter.coverLetterOptional
            })
        }

        setFeedData(filteredFeed);

    }
    return (
        <div>
            <div className="flex relative max-lg:flex-col xl:px-[125px] py-10 lg:px-[2rem] md:px-[3rem]"
                 onClick={() =>  {showModal && setShowModal(false)}}>
                {location.pathname === '/jobs' && <div className="lg:w-[40rem] top-10 px-5 max-lg:order-2">
                    <div className="sticky top-[7rem]">
                        <FilterCard applyFilterDisabled={false} onFilter={handleOnApplyFilter}/>
                    </div>
                </div>}
                <div className="lg:w-[65rem] flex-col justify-center max-lg:order-3">
                    <div className="w-full flex items-center justify-center">
                        <hr className={style.line}/>
                        <div className={style.buttonWrapper}>
                            <Button
                                variant="contained"
                                className={style.newPostButton}
                                onClick={() => setShowModal(true)}
                            >
                               <span className="">{t('notifications.buttons.newPost')}</span>
                            </Button>
                        </div>
                        <hr className={style.line}/>
                    </div>
                    <FeedContent feedData={feedData} />
                </div>
                <div className="lg:w-[40rem] top-10 p-5 max-lg:order-1">
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