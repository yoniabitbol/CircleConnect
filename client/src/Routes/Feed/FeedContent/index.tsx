import {FC, useEffect, useRef, useState} from 'react';
import FeedCard from '../FeedCard';



const FeedContent:FC<{ feedData: any}> = (props) => {
    const {feedData} = props;
    const ref = useRef<any>();
    const [scrollTo, setScrollTo] = useState(0);
    useEffect(() => {
        if(ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }, [ref.current])
    return (
        <div className="flex-row w-full justify-center">
            {feedData && feedData.map((data : any, i: number) => {
                return ( <div key={data.id} ref={i === scrollTo ? ref: null}>
                    <FeedCard  userInfo={data.creator} scrollTo={setScrollTo.bind(this, i)}
                              postInfo={{id:data._id,text: data.text, img: data.image, comments: data.comments, date: data.createdAt, position: data.position}}
                              postSettings={{isJobListing:data.isJobListing, isResumeRequired:data.isResumeRequired, isCoverLetterRequired: data.isCoverLetterRequired, isThirdParty: data.isThirdParty, thirdPartyLink: data.thirdPartyLink, uploadDeadline: data.uploadDeadline}}
                              numLikes={data.likes.length} numComments={data.comments.length} userPic={data.image}/>
                </div>)
            })
            }
        </div>
    );
};

export default FeedContent;