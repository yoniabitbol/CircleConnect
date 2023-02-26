import React from 'react';
import FeedCard from '../FeedCard';
const FeedDummyData = [{
    id: 1,
    userInfo: {
        name: 'John Doe',
        title: 'Software Engineer',
        img:''
    },
    postInfo:{
        text: 'looking for applicants',
        img: 'https://media.istockphoto.com/id/1364176524/vector/now-hiring-random-shapes-blue-business-symbols-background.jpg?s=612x612&w=0&k=20&c=Gna-i8qknM9oDuzNx-7WSyaqPbNz5yc7ne4j3F05ILQ='
    },
    numLikes: 63,
    numComments: 12,
}]
const FeedContent:React.FC = () => {
    return (
        <div className="flex-row w-full justify-center">
            {FeedDummyData.map((data, index) => {
                return <FeedCard key={index} userInfo={data.userInfo} postInfo={data.postInfo} numLikes={data.numLikes} numComments={data.numComments}/>
            })
            }
        </div>
    );
};

export default FeedContent;