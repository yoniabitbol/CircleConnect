import {FC, useEffect, useRef, useState} from 'react';
import FeedCard from '../FeedCard';

const feedDataD = [{
    _id:1,
    creator: {
        name: 'John Doe',
        title: 'Software Engineer',
        img:''
    },
        text: 'looking for applicants',
        img: 'https://media.istockphoto.com/id/1364176524/vector/now-hiring-random-shapes-blue-business-symbol' +
            's-background.jpg?s=612x612&w=0&k=20&c=Gna-i8qknM9oDuzNx-7WSyaqPbNz5yc7ne4j3F05ILQ=',
        comments: ['comment1', 'comment2'],
        likes: ['like1', 'like2'],
        isJobListing: true,
        isResumeRequired: true,
        isCoverLetterRequired: true,
},

]


const FeedContent:FC<{ feedData: any}> = (props) => {
    const {feedData} = props;
    const ref = useRef<any>();
    const [scrollTo, setScrollTo] = useState(0);
    useEffect(() => {
        if(ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }, [ref.current])
    console.log(feedData)
    return (
        <div className="flex-row w-full justify-center">
            {feedDataD && feedDataD.map((data : any, i: number) => {
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