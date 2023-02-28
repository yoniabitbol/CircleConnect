import { Skeleton} from '@mui/material';
const UserBannerSkeleton = () => {
    return (
        <div className="pb-5 rounded-t-2xl bg-white w-full">
            <div  className="w-full h-20 rounded-t-2xl object-cover">
                <Skeleton variant="rectangular" width="100%" height="100%"/>
            </div>
            <div className="flex justify-center -mt-16">
                <Skeleton variant="circular" width={128} height={128}/>
            </div>
            <div className="items-center flex-col flex">
                <Skeleton variant="text" animation="wave" width={200} height={50}/>
                <Skeleton variant="text" animation="wave" width={150} height={30}/>
                <Skeleton variant="text" animation="wave" width={100} height={20}/>
            </div>
        </div>
    );
};

export default UserBannerSkeleton;