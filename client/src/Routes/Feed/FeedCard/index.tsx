import {Card, CardContent, CardActions, Button, Avatar, IconButton} from '@mui/material';
import { ThumbUpOffAlt, ChatBubbleOutline, ThumbUpAlt, ChatBubble} from '@mui/icons-material';
import ApplyDropUp from '../../../components/ApplyDropUp';
import React, {useEffect, useState} from 'react';
import Comments from './Comments';
import classes from './style.module.css';
import getUserProfilePic from '../../../http/getUserPicturePic';
import likePost from '../../../http/likePost';
import getPostImage from '../../../http/getPostImage';
function getCount(str: string) {
    return str.split(' ').filter(function(num: string) {
        return num != ''
    }).length;
}
function getWordStr(str: string, num: number) {
    return str.split(/\s+/).slice(0, num).join(" ");
}

const FeedCard:React.FC<{userInfo:any, postInfo: any, numLikes:any, numComments:any, userPic:string, postSettings: any }> = (props) => {
    const {userInfo, postInfo, numLikes, numComments, userPic, postSettings} = props;
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



    useEffect(() => {
        getPostImage(postInfo.img).then(res => {
            if(res)
            setPostImage(res);
            else
                setPostImage(null);
        })
    }, [ postInfo])
    const likeClickHandler = () => {
        setLike(!like);
        if (like) {
            setNumberLikes(numberLikes - 1);
        } else {
            setNumberLikes(numberLikes + 1);
        }
        likePost(postInfo.id).then(res => {
            console.log(res);
        })
    }
    const commentClickHandler = () => {
        setShowComments(!showComments);
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

    return (
        <Card sx={{marginTop: 2, borderRadius:5}}>
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
                    <div className="flex items-center p-3">
                        <Avatar src={userProfilePic}/>
                        <div className="ml-2">
                            <h1 className="font-bold">{userInfo.name}</h1>
                            <h2>{userInfo.title}</h2>
                        </div>
                    </div>
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
                    </div>
                </div>
            </CardContent>
            <CardActions >
                <div className="w-full flex ">
                    <div className="w-1/6 min-w-fit">
                        <IconButton onClick={likeClickHandler} size="small" style={{borderWidth:'2px', borderColor:'#4D47C3', color:'#4D47C3'}} >{like ? <ThumbUpAlt/> :<ThumbUpOffAlt/>}</IconButton>
                        <span>{numberLikes}</span>
                    </div>
                    <div>
                        <IconButton onClick={commentClickHandler} size="small" style={{borderWidth:'2px', borderColor:'#4D47C3', color:'#4D47C3'}} >{showComments ? <ChatBubble/> : <ChatBubbleOutline/>}</IconButton>
                        <span>{numComments}</span>
                    </div>
                </div>
                {postSettings.isJobListing && <div className="mr-3">
                    <ApplyDropUp postSettings={postSettings}/>
                </div>}
            </CardActions>
            <div className={`${!showComments && 'hidden'}`}>
                <Comments userPic={userPic} comments={postInfo.comments} postId={postInfo.id}/>
            </div>
        </Card>
    );
};

export default FeedCard;