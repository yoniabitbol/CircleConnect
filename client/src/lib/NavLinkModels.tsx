import {RssFeed, PeopleAltOutlined, WorkOutlineOutlined, ChatBubbleOutlineOutlined, NotificationsNoneOutlined} from "@mui/icons-material";
import i18n from "../i18n/i18n";

const NavLinkModels = [
  {
    key: 1,
    icon: <RssFeed/>,
    text: i18n.t("common.label.feed"),
    path: "/feed",
  },
  {
    key: 2,
    icon: <PeopleAltOutlined/> ,
    text: i18n.t("common.label.network"),
    path: "/network",
  },
  {
    key: 3,
    icon: <WorkOutlineOutlined/> ,
    text: i18n.t("common.label.jobs"),
    path: "/jobs",
  },
  {
    key: 4,
    icon: <ChatBubbleOutlineOutlined/>,
    text: i18n.t("common.label.chat"),
    path: "/chat",
  },
  {
    key: 5,
    icon: <NotificationsNoneOutlined/> ,
    text: i18n.t("common.label.notif"),
    path: "/notifications",
    
  },]

export default NavLinkModels;