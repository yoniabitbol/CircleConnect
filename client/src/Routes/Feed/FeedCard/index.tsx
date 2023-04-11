import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import {
  ThumbUpOffAlt,
  ChatBubbleOutline,
  ThumbUpAlt,
  ChatBubble,
  Error,
  Edit
} from '@mui/icons-material';
import ApplyDropUp from "../../../components/ApplyDropUp";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import classes from "./style.module.css";
import getUserProfilePic from '../../../http/getUserPicturePic';
import likePost from "../../../http/likePost";
import getPostImage from "../../../http/getPostImage";
import { Link } from "react-router-dom";
import PostModal from './PostModal'

function getCount(str: string) {
  return str.split(" ").filter(function (num: string) {
    return num != "";
  }).length;
}

function getWordStr(str: string, num: number) {
  return str.split(/\s+/).slice(0, num).join(" ");
}

const indeedLogoFile = "Indeed-Symbol.png";
const glassdoorLogoFile = "glassdoor-icon.webp";

const FeedCard: React.FC<{
  userInfo: any;
  postInfo: any;
  numLikes: any;
  numComments: any;
  userPic: string;
  postSettings: any;
  scrollTo: () => void;
  editable?: boolean;
  fetchFeed?: any;
  postStatus?: any;
}> = (props) => {
  const {
    userInfo,
    postInfo,
    numLikes,
    numComments,
    userPic,
    postSettings,
    scrollTo,
    editable,
    fetchFeed,
      postStatus,
  } = props;
  const [readMore, setReadMore] = useState(false);
  const [numberLikes, setNumberLikes] = useState(numLikes);
  const [like, setLike] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState<string>("");
  const [postImage, setPostImage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    getUserProfilePic(userInfo.picture).then(res => {
        if(res)
        setUserProfilePic(res);
    }).catch(() => {
        setUserProfilePic(userPic);
    })
    setUserProfilePic("");
  }, []);

  const isIndeedLink = postSettings.isThirdParty
    ? postSettings.thirdPartyLink.includes("ca.indeed.com")
    : false;
  const isGlassdoorLink = postSettings.isThirdParty
    ? postSettings.thirdPartyLink.includes("glassdoor.com")
    : false;
  const thirdPartyLogo = postSettings.isThirdParty
    ? isIndeedLink
      ? indeedLogoFile
      : isGlassdoorLink
      ? glassdoorLogoFile
      : null
    : null;

  useEffect(() => {
    if (postInfo.img) {
      getPostImage(postInfo.img)
        .then((res) => {
          if (res) setPostImage(res);
        })
        .catch(() => {
          setPostImage(null);
        });
    }
  }, [postInfo]);
  const likeClickHandler = () => {
    likePost(postInfo.id).then((res) => {
      if (res.status === "success") {
        if (res.message === "Post disliked successfully") {
          setNumberLikes(numberLikes - 1);
          setLike(false);
        } else {
          setNumberLikes(numberLikes + 1);
          setLike(true);
        }
      }
    });
  };
  const commentClickHandler = () => {
    setShowComments(!showComments);
    if (!showComments) scrollTo();
  };

  const isDeadlinePassed = () => {
    const deadline = new Date(postSettings.uploadDeadline);
    const today = new Date();
    return deadline < today;
  };

  const parseDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const howLongAgo = (date: string) => {
    const dateObj = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return "Today";
    }
    if (diffDays === 1) {
      return "1 day ago";
    }
    if (diffDays < 7) {
      return `${Math.floor(diffDays)} days ago`;
    }
    if (diffDays === 7) {
      return "1 week ago";
    }
    if (diffDays >= 30) {
      return `${Math.floor(diffDays / 30)} month(s) ago`;
    }
    if (diffDays > 7) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    }
    if (diffDays > 365) {
      return `${Math.floor(diffDays / 365)} year(s) ago`;
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  }

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip placement="top" {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgba(255,255,255,0.7)",
      color: "#F44336",
      maxWidth: 300,
      fontSize: theme.typography.pxToRem(17),
      border: "1px solid #F44336",
    },
  }));

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  return (
      <>
    <Card id={postInfo.id} sx={{ marginTop: 2, borderRadius: 5, padding: 0, position: 'relative' }}>
      <CardContent sx={{ padding: 0 }}>
        {editable && <div className='absolute right-0'>
          <IconButton onClick={handleOpenModal}>
            <Edit/>
          </IconButton>
        </div>}
        {postSettings.isJobListing && postInfo.position && (
          <div className="ml-3 p-1.5 flex items-center border-gray-100 border-b-2">
            <Typography
              sx={{ fontSize: 14, width: "100%" }}
              color="text.secondary"
              variant="h2"
              gutterBottom
            >
              Looking for <span className="font-extrabold">{postInfo.position && postInfo.position}</span>
            </Typography>
          </div>
        )}
        <div>
          <Link
            to={`/profile/${userInfo.user_id}`}
            className="flex items-center p-2"
          >
            <Avatar sx={{height:70, width:70}} src={userProfilePic}/>
            <div className="ml-2 flex-col -space-y-1">
              <h1 className="font-bold">{userInfo.name}</h1>
              <div className="flex-col -space-y-3">
                <h2>{userInfo.title}</h2>
                <Typography sx={{padding:0}} variant="caption">{howLongAgo(postInfo.date)}</Typography>
              </div>

            </div>
          </Link>
          <div className="border-gray-100 border-b-2 h-full pt-2">
            <div
              className={`${
                getCount(postInfo.text) > 60
                  ? !readMore && classes.postText
                  : classes.postTextMore
              }`}
            >
              <Typography sx={{marginBottom:2, overflowWrap:'break-word'}} variant="body1" className="break-words">
                {getCount(postInfo.text) > 60 && !readMore
                  ? getWordStr(postInfo.text, 60)
                  : postInfo.text}
              </Typography>
            </div>
            {getCount(postInfo.text) > 60 && (
              <Button
                onClick={() => setReadMore(!readMore)}
                size="small"
                style={{
                  color: "#4D47C3",
                  padding: 10,
                  fontWeight: "600",
                }}
              >
                {readMore ? "SHOW LESS" : "READ MORE"}
              </Button>
            )}
            {postImage && (
              <img
                style={{
                  aspectRatio: 2/ 1,
                  marginTop: 5,
                }}
                className="w-full"
                src={postImage}
              />
            )}
            {postSettings.isThirdParty && (
              <div className="p-2 flex">
                <img
                  style={{ maxWidth: "2rem", maxHeight: "2rem" }}
                  src={
                    process.env.PUBLIC_URL +
                    "/Third Party Link logos/" +
                    thirdPartyLogo
                  }
                />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center"
                  href={postSettings.thirdPartyLink}
                >
                  {isIndeedLink
                    ? "ca.indeed.com"
                    : isGlassdoorLink
                    ? "Glassdoor.com"
                    : "Third Party Link"}
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardActions>
        <div className="w-full flex space-x-3">
          <div className="w-1/6 min-w-fit">
            <IconButton
              onClick={likeClickHandler}
              size="small"
              style={{
                borderWidth: "2px",
                borderColor: "#4D47C3",
                color: "#4D47C3",
              }}
            >
              {like ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
            </IconButton>
            <span>{numberLikes}</span>
          </div>
          <div className="w-1/6 min-w-fit">
            <IconButton
              onClick={commentClickHandler}
              size="small"
              style={{
                borderWidth: "2px",
                borderColor: "#4D47C3",
                color: "#4D47C3",
              }}
            >
              {showComments ? <ChatBubble /> : <ChatBubbleOutline />}
            </IconButton>
            <span>{numComments}</span>
          </div>
        </div>
        {postSettings.isJobListing && (
          <div className="mr-3 flex space-x-3 items-center min-w-fit">
            {postSettings.uploadDeadline && (
              <div className="flex">
                <div className="min-[460px]:flex text-center items-center">
                  <div className="flex">
                    {isDeadlinePassed() && (
                      <HtmlTooltip title="Application deadline has passed">
                        <Error sx={{ color: "#F44336" }} />
                      </HtmlTooltip>
                    )}
                    <h2 className="font-bold">&nbsp; Deadline &nbsp;</h2>
                  </div>
                  <h1 className="border-b-2 p-1">
                    {parseDate(postSettings.uploadDeadline)}
                  </h1>
                </div>
              </div>
            )}
            <ApplyDropUp postSettings={postSettings} postId={postInfo.id} />
          </div>
        )}
      </CardActions>
      <div className={`${!showComments && "hidden"}`}>
        <Comments
          userPic={userPic}
          comments={postInfo.comments}
          postId={postInfo.id}
        />
      </div>
    </Card>
        <PostModal image={postImage} postStatus={postStatus} fetchFeed={fetchFeed} open={openModal} postInfo={postInfo} postSettings={postSettings} userInfo={userInfo} profilePic={userProfilePic} date={howLongAgo(postInfo.date)} onModalClose={handleModalClose} editable={editable}/>
        </>
  );
};

export default FeedCard;
