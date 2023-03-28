import {Card, CardContent, CardActions, Button, Avatar, IconButton, Tooltip, TooltipProps, styled, tooltipClasses} from '@mui/material';
import { ThumbUpOffAlt, ChatBubbleOutline, ThumbUpAlt, ChatBubble, Error} from '@mui/icons-material';
import ApplyDropUp from '../../../components/ApplyDropUp';
import React, {useEffect, useState} from 'react';
import Comments from './Comments';
import classes from './style.module.css';
import getUserProfilePic from '../../../http/getUserPicturePic';
import likePost from '../../../http/likePost';
import getPostImage from '../../../http/getPostImage';
import {Link} from 'react-router-dom';
function getCount(str: string) {
    return str.split(' ').filter(function(num: string) {
        return num != ''
    }).length;
}
function getWordStr(str: string, num: number) {
    return str.split(/\s+/).slice(0, num).join(" ");
}

const indeedLogoFile = 'Indeed-Symbol.png'
const glassdoorLogoFile = 'glassdoor-icon.webp'

const FeedCard:React.FC<{userInfo:any, postInfo: any, numLikes:any, numComments:any, userPic:string, postSettings: any, scrollTo:()=> void}> = (props) => {
    const {userInfo, postInfo, numLikes, numComments, userPic, postSettings, scrollTo} = props;
    const [readMore, setReadMore] = useState(false);
    const [numberLikes, setNumberLikes] = useState(numLikes);
    const [like, setLike] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [userProfilePic, setUserProfilePic] = useState<string>('');
    const [postImage, setPostImage] = useState<string | null>(null);
    useEffect(() => {
        getUserProfilePic(userInfo.user_id).then(res => {
            setUserProfilePic(res);
        })
    }, [])


    const isIndeedLink = postSettings.isThirdParty ? postSettings.thirdPartyLink.includes('ca.indeed.com') : false;
    const isGlassdoorLink = postSettings.isThirdParty ? postSettings.thirdPartyLink.includes('glassdoor.com') : false;
    const thirdPartyLogo = postSettings.isThirdParty ? isIndeedLink ? indeedLogoFile : isGlassdoorLink ? glassdoorLogoFile : null : null;



    useEffect(() => {
        getPostImage(postInfo.img).then(res => {
            if(res)
            setPostImage(res);
            else
                setPostImage(null);
        })
    }, [ postInfo])
    const likeClickHandler = () => {
        likePost(postInfo.id).then(res => {
            if(res.status === 'success'){
                if (res.message === "Post disliked successfully") {
                    setNumberLikes(numberLikes - 1);
                    setLike(false);
                } else {
                    setNumberLikes(numberLikes + 1);
                    setLike(true);
                }
            }

        })


    }
    const commentClickHandler = () => {
        setShowComments(!showComments);
        if(!showComments)
        scrollTo();
    }
    // const DummyComments = [
    //     {
    //         id: 1,
    //         name: 'Reuven Ostrofsky',
    //         userPic: 'https://images.unsplash.com/photo-1629209840003-8b2b0b2e1b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    //         comment: 'This is a comment',
    //     },
    //     {
    //         id: 2,
    //         name: 'Jonathan Abitbol',
    //         userPic: 'https://images.unsplash.com/photo-1629209840003-8b2b0b2e1b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    //         comment: 'This is a comment',
    //     }]

    const isDeadlinePassed = () => {
        const deadline = new Date(postSettings.uploadDeadline);
        const today = new Date();
        return deadline < today;
    }

    const parseDate = (date: string) => {
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return `${month} ${day}, ${year}`
    }

    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip placement='top' {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: 'red',
            color: 'white',
            maxWidth: 275,
            fontSize: theme.typography.pxToRem(17),
            border: '1px solid #dadde9',
        },
    }));
    return (
        <Card id={postInfo.id} sx={{marginTop: 2, borderRadius:5, padding:0}}>
            <CardContent sx={{padding: 0}}>
                {/*<div className="flex p-3 items-center border-gray-100 border-b-2">*/}
                {/*    <Typography sx={{ fontSize: 14, width: '100%'}} color="text.secondary" gutterBottom>*/}
                {/*        <span style={{color:'#4D47C3'}}>Reuven Ostrofsky</span> and <span style={{color:'#4D47C3'}}>Jonathan Abitbol</span> liked this*/}
                {/*    </Typography>*/}
                {/*    <div className='relative right-0'>*/}
                {/*        <MoreHoriz/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div>
                    <Link to={`/profile/${userInfo.user_id}`}  className="flex items-center p-3">
                        <Avatar src={userProfilePic}/>
                        <div className="ml-2">
                            <h1 className="font-bold">{userInfo.name}</h1>
                            <h2>{userInfo.title}</h2>
                        </div>
                    </Link>
                    <div className="p-3 border-gray-100 border-b-2 h-full pt-2 pl-10 pr-10">
                        <div className={`${getCount(postInfo.text) > 60 ? !readMore && classes.postText : classes.postTextMore}`}>
                            <p className="break-words">{getCount(postInfo.text) > 60 && !readMore ? getWordStr(postInfo.text, 60) : postInfo.text}</p>
                        </div>
                        {getCount(postInfo.text) > 60 && <Button onClick={() => setReadMore(!readMore)} size="small" style={{
                            color: '#4D47C3',
                            padding: 10,
                            fontWeight: '600'
                        }}>{readMore ? 'SHOW LESS' : 'READ MORE'}</Button>
                        }
                        {postImage &&  <img  style={{aspectRatio: 2 / 1, marginTop: 5, fontFamily: 'Poppins'}} className="w-full"
                              src={postImage}/>}
                        {postSettings.isThirdParty && <div className="p-2 flex">
                            <img
                                style={{ maxWidth: "2rem", maxHeight: "2rem" }}
                                src={process.env.PUBLIC_URL + "/Third Party Link logos/" + thirdPartyLogo}/>
                            <a target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center" href={postSettings.thirdPartyLink}>{isIndeedLink ? 'ca.indeed.com' : isGlassdoorLink ? 'Glassdoor.com': 'Third Party Link'}</a>
                        </div>}
                    </div>
                </div>
            </CardContent>
            <CardActions >
                <div className="w-full flex">
                    <div className="w-1/6 min-w-fit">
                        <IconButton onClick={likeClickHandler} size="small" style={{borderWidth:'2px', borderColor:'#4D47C3', color:'#4D47C3'}} >{like ? <ThumbUpAlt/> :<ThumbUpOffAlt/>}</IconButton>
                        <span>{numberLikes}</span>
                    </div>
                    <div>
                        <IconButton onClick={commentClickHandler} size="small" style={{borderWidth:'2px', borderColor:'#4D47C3', color:'#4D47C3'}} >{showComments ? <ChatBubble/> : <ChatBubbleOutline/>}</IconButton>
                        <span>{numComments}</span>
                    </div>
                </div>
                {postSettings.isJobListing && <div className="mr-3 flex space-x-3 items-center min-w-fit p-2">
                    {postSettings.uploadDeadline && <div className="flex">
                        <div className="min-[460px]:flex text-center">
                            <div className="flex">
                                {isDeadlinePassed() && <HtmlTooltip
                                    title="Application deadline has passed"
                                >
                                    <Error sx={{color: 'red'}}/>
                                </HtmlTooltip>}
                                <h2 className='font-bold'>&nbsp; Deadline &nbsp;</h2>
                            </div>

                            <h1>{parseDate(postSettings.uploadDeadline)}</h1>
                        </div>

                    </div>
                    }
                    <ApplyDropUp postSettings={postSettings} postId={postInfo.id}/>
                </div>}
            </CardActions>
            <div className={`${!showComments && 'hidden'}`}>
                <Comments userPic={userPic} comments={postInfo.comments} postId={postInfo.id}/>
            </div>
        </Card>
    );
};

export default FeedCard;