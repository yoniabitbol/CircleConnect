import {FC, useEffect, useRef, useState} from 'react';
import FeedCard from '../FeedCard';

// const FeedDummyData = [{
//     id: 1,
//     userInfo: {
//         name: 'John Doe',
//         title: 'Software Engineer',
//         img:''
//     },
//     postInfo:{
//         text: 'looking for applicants',
//         img: 'https://media.istockphoto.com/id/1364176524/vector/now-hiring-random-shapes-blue-business-symbol' +
//             's-background.jpg?s=612x612&w=0&k=20&c=Gna-i8qknM9oDuzNx-7WSyaqPbNz5yc7ne4j3F05ILQ='
//     },
//     numLikes: 63,
//     numComments: 12,
// },
//     {
//         id: 2,
//         userInfo: {
//             name: 'John Doe',
//             title: 'Software Engineer',
//             img:''
//         },
//         postInfo: {
//             text: 'In Search for full stack developer, here are the requirements: 1. 3+ years of experience 2. Experience with React 3. Experience with Node.js 4. Experience with MongoDB 5. Experience with AWS 6. Experience with Docker 7. Experience with Typescript 8. Experience with GraphQL 9. Experience with Next.js 10. Experience with React Native 11. Experience with Redux 12. Experience with Express 13. Experience with Jest 14. Experience with Cypress 15. Experience with Storybook 16. Experience with Material UI 17. Experience with Tailwind 18. Experience with Styled Components 19. ' +
//                 'Experience with Webpack 20. Experience with Babel 21. Experience with Git 22. Experience with Github 23. ' +
//                 'Experience with Gitlab 24. Experience with Bitbucket 25. Experience with Jira 26. Experience with Confluence 27. Experience with Trello 28. Experience with Notion 29. Experience with Figma 30. Experience with Sketch 31. Experience with Adobe XD 32. Experience with Adobe Illustrator 33. Experience with Adobe Photoshop 34. Experience with Adobe After Effects 35. Experience with Adobe Premiere Pro 36. Experience with Adobe Lightroom 37. Experience with Adobe Audition 38. Experience with Adobe InDesign 39. Experience with Adobe Animate 40. Experience with Adobe Spark 41. Experience with Adobe Spark Post 42. Experience with Adobe Spark Video 43. Experience with Adobe Spark Page 44. Experience with Adobe Spark Premiere 45. Experience with Adobe Spark Canva 46. Experience with Adobe Spark Post 47. Experience with Adobe Spark Video 48. Experience with Adobe Spark Page 49. Experience with Adobe Spark Premiere 50. Experience with Adobe Spark Canva 51. Experience with Adobe Spark Post 52. Experience with Adobe Spark Video 53. Experience with Adobe Spark Page 54. Experience with Adobe Spark Premiere ',
//             img: 'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2018/12/05163015/ATS.png'
//         },
//         numLikes: 22,
//         numComments: 3,
//     }
// ]

const FeedContent:FC<{userPic: string, feedData: any}> = (props) => {
    const {userPic, feedData} = props;
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
                              postInfo={{id:data._id,text: data.text, img: data.image, comments: data.comments}}
                              postSettings={{isJobListing:data.isJobListing, isResumeRequired:data.isResumeRequired, isCoverLetterRequired: data.isCoverLetterRequired, isThirdParty: data.isThirdParty, thirdPartyLink: data.thirdPartyLink, uploadDeadline: data.uploadDeadline}}
                              numLikes={data.likes.length} numComments={data.comments.length} userPic={userPic}/>
                </div>)


            })
            }
        </div>
    );
};

export default FeedContent;