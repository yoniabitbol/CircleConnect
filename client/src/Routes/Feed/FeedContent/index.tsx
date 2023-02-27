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
        img: 'https://media.istockphoto.com/id/1364176524/vector/now-hiring-random-shapes-blue-business-symbol' +
            's-background.jpg?s=612x612&w=0&k=20&c=Gna-i8qknM9oDuzNx-7WSyaqPbNz5yc7ne4j3F05ILQ='
    },
    numLikes: 63,
    numComments: 12,
},
    {
        id: 2,
        userInfo: {
            name: 'John Doe',
            title: 'Software Engineer',
            img:''
        },
        postInfo: {
            text: 'In Search for full stack developer, here are the requirements: 1. 3+ years of experience 2. Experience with React 3. Experience with Node.js 4. Experience with MongoDB 5. Experience with AWS 6. Experience with Docker 7. Experience with Typescript 8. Experience with GraphQL 9. Experience with Next.js 10. Experience with React Native 11. Experience with Redux 12. Experience with Express 13. Experience with Jest 14. Experience with Cypress 15. Experience with Storybook 16. Experience with Material UI 17. Experience with Tailwind 18. Experience with Styled Components 19. ' +
                'Experience with Webpack 20. Experience with Babel 21. Experience with Git 22. Experience with Github 23. ' +
                'Experience with Gitlab 24. Experience with Bitbucket 25. Experience with Jira 26. Experience with Confluence 27. Experience with Trello 28. Experience with Notion 29. Experience with Figma 30. Experience with Sketch 31. Experience with Adobe XD 32. Experience with Adobe Illustrator 33. Experience with Adobe Photoshop 34. Experience with Adobe After Effects 35. Experience with Adobe Premiere Pro 36. Experience with Adobe Lightroom 37. Experience with Adobe Audition 38. Experience with Adobe InDesign 39. Experience with Adobe Animate 40. Experience with Adobe Spark 41. Experience with Adobe Spark Post 42. Experience with Adobe Spark Video 43. Experience with Adobe Spark Page 44. Experience with Adobe Spark Premiere 45. Experience with Adobe Spark Canva 46. Experience with Adobe Spark Post 47. Experience with Adobe Spark Video 48. Experience with Adobe Spark Page 49. Experience with Adobe Spark Premiere 50. Experience with Adobe Spark Canva 51. Experience with Adobe Spark Post 52. Experience with Adobe Spark Video 53. Experience with Adobe Spark Page 54. Experience with Adobe Spark Premiere ',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAzFBMVEX///8CgfoBY98KaeEFZ+EAgvsBZeAAfvcAf/oAfPoAfvoCe/QHZt4IauIGbeUEcuoAcOsEdu8AXt8Ad/oAXd/3+v8AYN7w9v/I2Pff6PoAdvoAWd3o8f+x0P4AXd6jx/2owfJUnPvN4f4+kvtJl/u61v4AVd2Rvf0Yhfqfu/HY5/9yrPyHtvySsu4ZcOPB2v47ivS0yvSKquxZjOcxd+R6oOtbj+l6sfxplemBp+1NhebI3v8AUNyIuP29z/Rsqfw9gOhgovuoy/6bwv1whLnoAAALxUlEQVR4nO2cCXeqTLZAAwJSGBVBMQrexOFGQhJj5qkTM/z//9SFgFQVU5GA971eZ/e6SXp9imxPcerUAAcHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwP9nBiG/PUCFp1QhzvXN7Z1k2LYh3b3cn8xKH2Dw9+JzLiOE5PX08cur4RR/w+iyc2r3LUvcYlmGfWo/XA/5DzCcLEwTaargo2oaMuXH8l9Sbbzfiv1QTlTw/8TtP8Po3I/4DuAsXU0TGJA6n5T4jmrk6CXS8+0URdxh9cV7p/gAg2MXsXpBLNF88u+vSefJtnytIHYiZYjpKzdF5+jNkZoquHVc/Ou2etb/E4aP+rFrstixnX+Oy7EmyFmGgqCN3/akkopza5OBU5IxVPD/t5+zw+hMkYzJNsTX4/zf5VXvrq+Q4aL/8P+WFB/jJSvjzFxNlosUNffvXrVi3iVLTKLEv5UIq5PeUl9VVS42FDR0vGe1gOtTi3Da/YiDSSDa7ylH+IsEWeZRFMbLvesdHJz8J+r8IimFMiQFJUU8vUwc4cuMBQsMhfHF/gXtlMZJGMZyIcYNK6gRgoEhLmYwqX0H2ndKfTd2EYwNFSKSDJLEKpJNNFD0C9LN+Wa6dlGiwMH/9XuvgiPLUhRGjmiyceTCvySf0zPiCDOkUoIqcpdeUKQNvK9FiuP4dY+CQ7/GVpjoxQElBJVYkFL0BF8hDiByJ9QneOdj1lFFe+wXX4zUTsKybUsR+3iQIab4YeyT8ACOS52/ZiavMm/BFqvaem+F+I0tUjEL+CM9nM2c4dA5Onta9a0UQZxSw06DPnvNTWuAgyUbRbTZk+DRHyZ427GS9EwULs7JnSEmBCVJlLYvOqcEM8uyv2wU0ST9hRUzXJE9fcjpAztMOjEM1s9XXOEadTJuNokIzjMbn8eOOrS9tNOnPtNCFdEyTpKvG+AXsoKSZL0ceGaTMNTmOZ/lybSiNq3LiuCoH9diIcYqvZmdiCmKxvOiRRgWpI8Z007NPRThdxZraK2yhg5HjbQo6s3QEP/S3IIugLkW1frz6ZmtMIaWlT1TMUpTVMIY+qJaYTf+RiuiumvwoURUZMFFaOdNNzmrSJFIOorgG/qCY47kOKc7DZlzduunPPcjue1P/Nu4zn3DaJW' +
                'M4mFHbm4FzUeOj3QEKtvU3CniVhcNh0JsdsjA4ilJRbEn+4JozfWhx0y3WGvxdk8nUjx6/yic7sPJNxlFX7DV5DvXwYJqp+j81xrZOGRJvW2opxwneWawgg2pLTRbJu/cxMykYjiuMZ3eGMygwU6O3FN47jOCjcZhR+h9cn/uhq7yahzv234iJEZ9osj1tsGDxQhixZ7AMR0eMqKCqMq1BfEkjMUuhAV5dIezUmg/jFGmimaC+PWj0+fgY5cVwyvxjvedRzYr2LC4GniIR4+26qpOZzbZd2PDftoUYTo3Bu2HsY9KfPZCa5JBrKnDuKeuJtyrvZR484vFCDaUuxKX0xUixyM1dRjkxbQNos15FW4ZrZQGg/XM//bBXCMUa6q/r5mcr9yVWdvzWiJr2BBLtNOlH8SdI6pl3u2Jqb6MMqniYC10DhnBtrTif/8oMAwVEU9BWxZnxRQmdpmWcoFkmTXE7bSoqCWYakQMVaH0+RfzzuaZhxJv9nCXLbcSV2LD4k+Kx3QzrWFp+ElstyM7/w+rRJ4Jamc50U4byi33MRyTEKxlINzVO/qWdmCqlMgz30HVFbVTotdIm8LKgM6mi/IGBcwUXe8EjvhnuUbqhctJKe1U6nBXp9tsKkSOZuWbNM5EPaTT8U1F/nrmYB7VXCntVHziPcqr2WzG+dS8+olFHk+STpE5v5bkezevKwuHEqtocXeKlGH1F2KXFpT4KzbHjOdZ5F4iiNIH74G2F2J0LWr8o0s+Rn3aUOTv7qdECAU50WHwJ5s3stOvvHD7smhD/o7sa7wT9BdC58l2qnAmmyuqrDErnlV8VmjDO94UOHJVNRaUkXdpJZLNPd+hPIEq3Cpeh3qgBXXuvuITkYL46hl8JILIWYEPXMqw2lQz/GASDe9k0ASFIQyXsz1/kwOdafiTzYIs3CqeGXZ0vetn0243+CVyNpGhRgkGW0aeEuMozhmNR0QW34tK+/xXsbeLn29pcV7m0QxSuN8iyH9OsgLnG6d8kaWpuuafq+PgeNwj0Xt839+VSQrKUXI4i9rpoc/2SuSqbF7JqQzVrTSZXui04ZrLcLjWqBDuquWVFAv6iu2GwZNsPD+Eu/Kh2gHUhjHkKygu6BCau1N6t2K/IIhK8fqHv0eFVESVLgcvGEOuVPpKdRQyWWf5ycZ3C/7xJpvhtm7bGVa5JXOwpg3HXJPOc6qNyuTS5mgVRC/44TfTRqe4SsIDad8wVKx0L99w3aMNeRrIcjdmCtIMFfczizAM2inHcH+KSMMqZ6Mcl9BrtVpjjovcMSlBma6UBx/xZRjkmjbHtMiGMqyyyx81fS//X8CYI1HHy5pBmmEa9pF9eEjlGlzaFCYbv8tXI8NKVy+8Fg3HGuVxvCBG9xQRTyJhiK/DRru4An+rz7DHGBa+Y+QKAqloJiapHYWJYbtdONxfkoaVTkZ5qKzhp0YZpo3ILy3WUCrqFI9RLCioedvFyjIzaUNU9IYJvX1CRmkX7p0YpZrQsF3UKf7fMRwy+0PSu66jP2QM2z5KfqeIS++dYMWGqJzhlN7GpLrpmenJohppu92R8leV/cGFUIsheR1ut/rkv3xC7w7JXHePkk1s2LHO0l8a4K9dxIaVZppWkyI/0zjM7SFa5lj10qAEsWFHyetqv0nDansLgVbM7w+ZNirkVECdaPS0M5TyZoBwf0h8cVXOmI5cjTI08xLCkk0zOYvuR2JU0' +
                'ISC+e30nDSsdDHfWTOGOZU3u6tXQHkBx8mGaqSYbvbXNyV3ZFQ6thjMKUM17w4dl9l8nn83j7M6pEOI22nmgsFgTu6Ar/aWvSki/FQ1p6w/Z9po7kb1A/8OMSaEONlk9fsjl+gOK97y/YhiPR83KzseMx2FoBYNbB9ERrDb7Wekpleqwy88cimojsj//rLOIXGbS+F8x8igBbFh1prBIyIN3UpnE2dsH54+vh6tmYtQzb5bZMelyIQQK6ZPLvoZPTasdkZ4yOaP1C9wMGdDyLVSeyfRIcSkXopX5JS3oFW884vtxVODmBDk67I8iRXsdqWURLkmd9RUvgWT7cYFNRGd4TTxmsyERHNpJQy7YiJTBnP6sWHF64deIkey7XSUuF9Q0Dh3EwxuFVYQX4vMxJQXpfPw8+dVb8ZgL0SBuZ/nap18OAn3fuyR1E4Y9nSqVJi5Lcqw+s3eb4kIqWp8CqPzMfsN4L6e/1s+MVjBbq+nE0/9WKJd7R8cnWdCsxyjlAesIG0zeZ29/n2bmyk3X2tlLpQnkQ2hv3gwXr+94w/42ph6izZU3aoFk9k0sECaoGqpT1/huaUpZvghsSEMVkj85QSzFw29d4p13LueKFfyKTu2mXUpwW48xd4jJhciQ1WtY5NwahCz0EpPMVwb3TRDevqkGS6v1bKDlrkjIJ+suac8Lq2EYCvDsOKadEcynWYKyj+p+5+kZBtNNVTNmp4gMZhnPs+JbaM/2zh4qycE0wyb2VNbv2XEFjZZgj/crjR80XkMtRofHzHhaqc/r4mHHzqHId8K9A/5KlZU1d/MLjwomYaRYsozNKrkK/35OEQLTX3GBT8bnRKklvW2grU/iudKyO0W0fy3efy7q2cI+oatPTyIx0mOkuIAao+/z3KzDz3DsNVEwl4ebDZxzdSmqpkVPQLwW9dTBZG52dNjFAfHeDDBzjkhtKjs+x0uP8Y6Y9hDaLPHhwwNrh79h6lqmj95qmkICfPHWZXf7/D6c+1vh4yGGKa7WNb8MIXkOXiT5WY6x0w3bxOv+lrf8SYXn4v1eo0/YHk1+veP+QQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4H+F/wJvchz/DmHHuwAAAABJRU5ErkJggg==',
        },
        numLikes: 22,
        numComments: 3,
    }
]
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