import {Avatar, IconButton, Typography} from '@mui/material';
import {MapsUgc} from '@mui/icons-material';
import {useState, FC, useEffect} from 'react';
import {useFormik} from 'formik';
import commentPost from '../../../../http/commentPost';
import { useTranslation } from "react-i18next";
import getCurrentUserProfile from '../../../../http/getCurrentUserProfile';
import getUserProfilePic from '../../../../http/getUserPicturePic';
import getUserProfile from '../../../../http/getUserProfile';

const Comments:FC<{userPic:any, comments:any, postId:any}> = (props) => {
    const {t} = useTranslation();
    const {comments, postId} = props;
    const [commentsList, setCommentsList] = useState<any>(comments);
    const [user, setUser] = useState<any>(null);
    const [userProfilePic, setUserProfilePic] = useState<string>('');
    
    const formik = useFormik({
        initialValues: {comment: ''}, onSubmit: (values,{resetForm}) => {

            commentPost(postId, values.comment).then((res) => {
                if(res.status === 'success'){
                    setCommentsList([...commentsList, {comment: values.comment, commenter: user._id, userPic: userProfilePic}]);
                }
            });
            
            resetForm();
    }
})

useEffect(() => {
    getCurrentUserProfile().then((res) => {
        setUser(res.data.user);
    });

},[])

useEffect(() => {
    if (user) {
        getUserProfilePic(user.picture).then((res) => {
            setUserProfilePic(res);
        }).catch(() => {
            setUserProfilePic('');
        });
    }
},[user])

useEffect(() => {
    commentsList?.map((comment:any) => {
        // Check if the comment object already has a userPic property
        if (!comment.userPic) {
            getUserProfile(comment.commenter).then((res: { data: any; }) => {
                comment.name = res.data.user.name;
                console.log(comment.name);
                
                getUserProfilePic(res.data.user.picture).then((res: any) => {
                    comment.userPic = res;
                    setCommentsList([...commentsList]); // Use the spread operator to create a new array and trigger a re-render
                }).catch(() => {
                    comment.userPic = '';
                    setCommentsList([...commentsList]);
                });
            }).catch(() => {
                comment.userPic = '';
                setCommentsList([...commentsList]);
            });
        }
    })
},[commentsList])

    return (
        <div className="p-3">
                <div className="flex items-center">
                    <Avatar src={userProfilePic}/>
                    <form className="w-full" onSubmit={formik.handleSubmit}>
                        <div className="flex items-center ml-3 w-full  rounded-2xl">
                            <input name="comment" value={formik.values.comment} onChange={formik.handleChange} className="w-full p-3 outline-none dark:secondary-dark rounded-2xl" placeholder={t('common.label.shareThoughts')|| "Share your thoughts"}/>
                            <IconButton type="submit" disabled={formik.values.comment === ''}>
                                <MapsUgc sx={{color: `${formik.values.comment !== '' ? '#4D47C3' : 'grey'}`}}/>
                            </IconButton>
                        </div>
                    </form>
                </div>
            <div className="flex-col mt-3 overflow-y-scroll max-h-[25rem]">
                {commentsList?.map((comment:any) => (
                        <div key={comment._id} className="flex mt-5">
                            <Avatar src={comment.userPic}/>
                            <div className="ml-3  dark:main-background w-full rounded-xl p-2">
                                <Typography variant='caption'>{comment.name}</Typography> 
                                {/* <h1 className="font-bold text-sm text-white">{comment.name}</h1> */}
                                <h2 className="text-white">{comment.comment}</h2>
                            </div>
                            </div>
                ))}
            </div>
            </div>
    );
};

export default Comments;