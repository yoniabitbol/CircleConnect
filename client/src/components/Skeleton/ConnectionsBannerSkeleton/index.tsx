import { Box, Skeleton} from '@mui/material';


const ConnectionsBannerSkeleton = () => {
    return (
        <div className="pb-5 bg-white w-full drop-shadow-md shadow-purple-500">
            <div className="p-3">
                <Skeleton variant="text" animation="wave" width={100} height={30}/>
                <hr className="w-full bg-gray-400 h-0.5 mt-2"/>
            </div>
            <div className="px-3">
                {Array.from({ length: 3 }).map((_, index) => {
                return <Box  key={index} sx={{border: 1, borderColor: '#D4D4D4', marginBottom: 1, width: 1, borderRadius:2, padding: 2, display:'flex', alignItems:'center'}}>
                    <div className=" items-center flex w-4/5" >
                        <Skeleton variant="circular" width={50} height={50}/>
                        <div className="flex-col min-w-fit">
                            <div className="ml-2 font-bold text-lg">
                                <Skeleton variant="text" animation="wave" width={100} height={30}/>
                            </div>
                        </div>
                    </div>
                       <Skeleton variant="rectangular" width={100} height={30}/>
                </Box>})}
            </div>
            <div className="p-2 ml-2">
                <Skeleton variant="text" animation="wave" width={100} height={30}/>
            </div>
        </div>
    );
};

export default ConnectionsBannerSkeleton;