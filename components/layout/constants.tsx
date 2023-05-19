import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RedditIcon from "@mui/icons-material/Reddit";
import CasinoIcon from "@mui/icons-material/Casino";

import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MailIcon from "@mui/icons-material/Mail";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Image from "next/image";

export const ListTypes = [
  {
    Icon: () => (
      <Image
        src="/images/header/topmenu icon-01.svg"
        alt="icon"
        width={18}
        height={18}
      />
    ),
    IconActive: () => (
      <Image
        src="/images/header/topmenu icon_active-01.svg"
        alt="icon"
        width={18}
        height={18}
      />
    ),
    name: "국내형 크로스",
    id: 1,
    path: "/domestic",
  },
  {
    Icon: () => (
      <Image
        src="/images/header/topmenu icon-02.svg"
        alt="icon"
        width={18}
        height={18}
      />
    ),
    IconActive: () => (
      <Image
        src="/images/header/topmenu icon_active-02.svg"
        alt="icon"
        width={18}
        height={18}
      />
    ),
    name: "해외형 스포츠",
    id: 2,
    path: "/oversea",
  },
  {
    Icon: () => <VideoCameraFrontIcon fontSize="small" />,
    IconActive: () => <VideoCameraFrontIcon fontSize="small" />,
    name: "라이브 스포츠",
    id: 3,
    path: "/live",
  },
  {
    Icon: () => <CasinoIcon fontSize="small" />,
    IconActive: () => <CasinoIcon fontSize="small" />,
    name: "라이브 카지노",
    id: 4,
    path: "/casino",
  },
  {
    Icon: () => (
      <Image
        src="/images/header/topmenu icon-04.svg"
        alt="icon"
        width={18}
        height={18}
      />
    ),
    IconActive: () => (
      <Image
        src="/images/header/topmenu icon_active-04.svg"
        alt="icon"
        width={18}
        height={18}
      />
    ),
    name: "슬롯게임",
    id: 5,
    path: "/slot-provider",
  },
  // {
  //   Icon: () => <SmartToyIcon fontSize="small" />,
  //   name: "미니게임",
  //   id: 6,
  //   path: "/mini-game",
  // },
  {
    Icon: () => (
      <Image
        src="/images/header/topmenu icon_minigame_inactive-05.svg"
        alt="icon"
        width={18}
        height={18}
      />
    ),
    IconActive: () => (
      <Image
        src="/images/header/topmenu icon_minigame_active-05.svg"
        alt="icon"
        width={18}
        height={18}
      />
    ),
    name: "로투스 게임",
    id: 7,
    path: "/virtual",
  },
];

export const SocialsList = [
  {
    id: "sc0",
    pathName: "/",
    icon: <TelegramIcon />,
  },
  {
    id: "sc1",
    pathName: "/",
    icon: <TwitterIcon />,
  },
  {
    id: "sc2",
    pathName: "/",
    icon: <InstagramIcon />,
  },
  {
    id: "sc3",
    pathName: "/",
    icon: <YouTubeIcon />,
  },
  {
    id: "sc4",
    pathName: "/",
    icon: <PinterestIcon />,
  },
  {
    id: "sc5",
    pathName: "/",
    icon: <RedditIcon />,
  },
];

export const LIST_BTN_SUB = [
  {
    id: "btn1",
    title: "입금",
    value: "deposit",
    icon: <AddBoxIcon />,
  },
  {
    id: "btn2",
    title: "출금",
    value: "withdraw",
    icon: <IndeterminateCheckBoxIcon />,
  },
  {
    id: "btn3",
    title: "문의",
    value: "customerSV",
    icon: <HeadphonesIcon />,
  },
  {
    id: "btn4",
    title: "쪽지",
    value: "mail",
    icon: <MailIcon />,
  },
  {
    id: "btn5",
    title: "",
    value: "notificationsIcon",
    icon: <NotificationsIcon />,
  },
  {
    id: "btn6",
    title: "로그아웃",
    value: "logout",
    icon: <PowerSettingsNewIcon />,
  },
];
