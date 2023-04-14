import {Avatar, IconButton} from '@mui/material';
import {MapsUgc} from '@mui/icons-material';
import {useState, FC} from 'react';
import {useFormik} from 'formik';
import commentPost from '../../../../http/commentPost';

const Comments:FC<{userPic:any, comments:any, postId:any}> = (props) => {
    const {userPic, comments, postId} = props;
    const [commentsList, setCommentsList] = useState<any>(comments);
    const formik = useFormik({
        initialValues: {comment: ''}, onSubmit: (values,{resetForm}) => {

            commentPost(postId, values.comment).then((res) => {
                if(res.status === 'success'){
                    setCommentsList(commentsList.concat(values));
                }
            })
            resetForm();
    }
})
    return (
        <div className="p-3">
                <div className="flex items-center">
                    <Avatar src={userPic}/>
                    <form className="w-full" onSubmit={formik.handleSubmit}>
                        <div className="flex items-center ml-3 w-full border-slate-100 border-2 rounded-2xl">
                            <input name="comment" value={formik.values.comment} onChange={formik.handleChange} className="w-full p-3 outline-none " placeholder="Share your thoughts"/>
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
                            <div className="ml-3 bg-[#4D47C3] w-full rounded-xl p-2">
                                <h1 className="font-bold text-white">{comment.name}</h1>
                                <h2 className="text-white">{comment.comment}</h2>
                            </div>
                            </div>
                ))}
            </div>
            </div>
    );
};

export default Comments;