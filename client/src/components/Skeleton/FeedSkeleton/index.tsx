import FeedCardSkeleton from './FeedCardSkeleton';

const FeedSkeleton = () => {
    return (
        //render 5 feed cards
<div className="flex-col space-y-3">
        <FeedCardSkeleton/>
        <FeedCardSkeleton/>
        <FeedCardSkeleton/>
        </div>



    );
};

export default FeedSkeleton;