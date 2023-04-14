import {Skeleton} from '@mui/material';
import {ThumbUpOutlined,ChatBubbleOutline} from '@mui/icons-material';

const FeedCardSkeleton = () => {
    return (
        <div className="bg-white h-fit p-0 rounded-2xl p-4 mt-2">
            <div className="p-1 border-gray-100 border-b-2">
                <Skeleton animation="wave" variant="text" height="100%" width={250}/>
            </div>
            <div  className="flex p-2">
                <Skeleton  variant="circular" width={70} height={70}/>
                <div className="ml-2 flex-col -space-y-1">
                    <Skeleton animation="wave" variant="text" height={25} width={100}/>
                    <div className="flex-col space-y-2">
                        <Skeleton animation="wave" variant="text" height={15} width={100}/>
                        <Skeleton animation="wave" variant="text" height={10} width={100}/>
                    </div>
                </div>
            </div>
            <div className="h-[50px] p-1 border-gray-100 border-b-2">
                <Skeleton animation="wave" variant="text" height="100%"/>
            </div>
            <div className="p-1 h-[50px] flex items-center ">
                <div className="w-1/2 flex space-x-1">
                    <ThumbUpOutlined sx={{color: '#E4E4E4'}}/>
                    <Skeleton variant="circular" width={20} />
                    <ChatBubbleOutline sx={{color: '#E4E4E4'}}/>
                    <Skeleton variant="circular" width={20} />
                </div>
            </div>
        </div>

    );
};

export default FeedCardSkeleton;