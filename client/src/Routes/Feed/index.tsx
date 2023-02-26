import FeedContent from './FeedContent';
import UserProfileBanner from '../../components/UserProfileBanner';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';

const Feed = () => {
    return (
        <div className="flex max-lg:flex-col-reverse md:p-10">
                <div className="w-full flex-col justify-center">
                    <div className="w-full flex items-center">
                        <hr className="w-1/5 bg-[#4D47C3] h-0.5"/>
                        <div className="p-2 w-full">
                            <Button
                                sx={{width:'100%',backgroundColor:'#4D47C3', ':hover':{backgroundColor:'#4D47C3'}}}
                                variant="contained"
                                disableElevation>
                                New Post
                            </Button>
                        </div>
                        <hr className="w-1/5 bg-[#4D47C3] h-0.5"/>
                    </div>

                    <FeedContent/>
                </div>
                <div className="lg:w-[40rem] p-5">
                    <Link to="/myprofile"><UserProfileBanner/></Link>
                </div>
            </div>
    );
};

export default Feed;