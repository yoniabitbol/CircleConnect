import {Card, CardContent, Typography, CardActions, Button, Avatar, IconButton} from '@mui/material';
import {MoreHoriz, ThumbUpOffAlt, ChatBubbleOutline, ThumbUpAlt} from '@mui/icons-material';
import ApplyDropUp from '../../../components/ApplyDropUp';
import React, {useState} from 'react';
import classes from './style.module.css';
function getCount(str: string) {
    return str.split(' ').filter(function(num: string) {
        return num != ''
    }).length;
}
function getWordStr(str: string, num: number) {
    return str.split(/\s+/).slice(0, num).join(" ");
}

const FeedCard:React.FC<{userInfo:any, postInfo: any, numLikes:any, numComments:any }> = (props) => {
    const {userInfo, postInfo, numLikes, numComments} = props;
    const [readMore, setReadMore] = useState(false);
    const [like, setLike] = useState(false);
    return (
        <Card sx={{marginTop: 2, borderRadius:5}}>
            <CardContent sx={{padding: 0}}>
                <div className="flex p-3 items-center border-gray-100 border-b-2">
                    <Typography sx={{ fontSize: 14, width: '100%'}} color="text.secondary" gutterBottom>
                        <span style={{color:'#4D47C3'}}>Reuven Ostrofsky</span> and <span style={{color:'#4D47C3'}}>Jonathan Abitbol</span> liked this
                    </Typography>
                    <div className='relative right-0'>
                        <MoreHoriz/>
                    </div>
                </div>
                <div>
                    <div className="flex items-center p-3">
                        <Avatar/>
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
                        <img style={{aspectRatio:2/1, marginTop: 5, fontFamily:'Poppins'}} className="w-full" src="https://media.istockphoto.com/id/1364176524/vector/now-hiring-random-shapes-blue-business-symbols-background.jpg?s=612x612&w=0&k=20&c=Gna-i8qknM9oDuzNx-7WSyaqPbNz5yc7ne4j3F05ILQ="/>
                    </div>
                </div>
            </CardContent>
            <CardActions >
                <div className="w-full flex ">
                    <div className="w-1/6 min-w-fit">
                        <IconButton onClick={()=>setLike(!like)} size="small" style={{borderWidth:'2px', borderColor:'#4D47C3', color:'#4D47C3'}} >{like ? <ThumbUpAlt/> :<ThumbUpOffAlt/>}</IconButton>
                        <span>{numLikes}</span>
                    </div>
                    <div>
                        <IconButton size="small" style={{borderWidth:'2px', borderColor:'#4D47C3', color:'#4D47C3'}} ><ChatBubbleOutline/></IconButton>
                        <span>{numComments}</span>
                    </div>
                </div>
                <div className="mr-3">
                   <ApplyDropUp/>
                </div>
            </CardActions>
        </Card>
    );
};

export default FeedCard;