// import NavLinkModel from "../Models/NavLinkModel";
import {RssFeed, PeopleAltOutlined, WorkOutlineOutlined, ChatBubbleOutlineOutlined, NotificationsNoneOutlined} from "@mui/icons-material";

const NavLinkModels = [
  {
    key: 1,
    icon: <RssFeed/>,
    text: "Feed",
    path: "/feed",
  },
  {
    key: 2,
    icon: <PeopleAltOutlined/> ,
    text: "Network",
    path: "/network",
  },
  {
    key: 3,
    icon: <WorkOutlineOutlined/> ,
    text: "Jobs",
    path: "/jobs",
  },
  {
    key: 4,
    icon: <ChatBubbleOutlineOutlined/>,
    text: "Chat",
    path: "/chat",
  },
  {
    key: 5,
    icon: <NotificationsNoneOutlined/> ,
    text: "Notifications",
    path: "/notifications",
    
  },]

export default NavLinkModels;