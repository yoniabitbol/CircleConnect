import {FC, useEffect, useRef, useState} from 'react';
import FeedCard from '../FeedCard';
import FeedSkeleton from '../../../components/Skeleton/FeedSkeleton';
import {Alert, Snackbar, Typography} from '@mui/material';



const FeedContent:FC<{ feedData: any, editable?:boolean, fetchFeed?:any}> = (props) => {
    const {feedData, editable, fetchFeed} = props;
    const ref = useRef<any>();
    const [scrollTo, setScrollTo] = useState(0);
    const [postStatus,setPostStatus] = useState<{status: boolean,message?: string}>({status: false});
    const [showAlert, setShowAlert] = useState<boolean>(false);
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }, [ref.current])

    const isPostedSuccess = (value : boolean, Message?: string) => {
        if(value){
            setPostStatus({status: true, message: Message});
        }else
            setPostStatus({status: false, message: Message});
        setShowAlert(true);


    }

    return (
        <div className="flex-row w-full justify-center">
            {!feedData && <FeedSkeleton/>}
            {feedData && feedData.length === 0 &&
                <div className="flex-col justify-center mt-4 text-gray-400">
                    <div className="flex-col text-center">
                        <Typography sx={{fontSize:50}}>Nothing to show here</Typography>
                        <Typography sx={{fontSize:30}}>Be the first to post</Typography>
                    </div>
                    <div className="flex justify-center">
                        <img className="h-[40rem]" src={process.env.PUBLIC_URL + '/Mascot/img.png'}/>
                    </div>
                </div>
            }
            {feedData && feedData.map((data : any, i: number) => {
                return ( <div key={data.id} ref={i === scrollTo ? ref: null}>
                    <FeedCard   userInfo={data.creator} scrollTo={setScrollTo.bind(this, i)}
                              postInfo={{id:data._id,text: data.text, img: data.image, comments: data.comments, date: data.updatedAt, position: data.position}}
                              postSettings={{isJobListing:data.isJobListing, isResumeRequired:data.isResumeRequired, isCoverLetterRequired: data.isCoverLetterRequired, isThirdParty: data.isThirdParty, thirdPartyLink: data.thirdPartyLink, uploadDeadline: data.uploadDeadline}}
                              numLikes={data.likes.length} numComments={data.comments.length} userPic={data.image} editable={editable} fetchFeed={fetchFeed} postStatus={isPostedSuccess}/>
                </div>)
            })
            }
            <Snackbar anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} open={showAlert} autoHideDuration={6000} onClose={()=> setShowAlert(false)}>
                <Alert severity={postStatus ? "success" : "error"} >{postStatus.message && postStatus.message}</Alert>
            </Snackbar>
        </div>
    );
};

export default FeedContent;