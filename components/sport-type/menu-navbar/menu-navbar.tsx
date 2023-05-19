import React from "react";
import classes from "./menu-navbar.module.css";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import HistoryIcon from "@mui/icons-material/History";

const MenuNavbar = () => {
  const router = useRouter();
  const path = router?.pathname;

  return (
    <div className={classes["menu-navbar"]}>
      <ul>
        {renderListMenu.map((i, idx) => (
          <li key={idx}>
            <Link href={i.path}>
              <Tooltip title={i.title} placement="bottom-end" arrow>
                <IconButton
                  className={path === i.path ? classes["active"] : ""}
                >
                  {i.icon}
                </IconButton>
              </Tooltip>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderListMenu = [
  {
    title: "집",
    icon: <HomeIcon style={{ color: "white", fontSize: "1.5rem" }} />,
    path: "/sports",
  },
  {
    title: "살다",
    icon: (
      <VideoCameraFrontIcon style={{ color: "white", fontSize: "1.5rem" }} />
    ),
    path: "/live",
  },
  {
    title: "베팅 내역",
    icon: <HistoryIcon style={{ color: "white", fontSize: "1.5rem" }} />,
    path: "/history",
  },
  // {
  //   title: "찾다",
  //   icon: <SearchIcon style={{ color: "white", fontSize: "1.5rem" }} />,
  //   path: "/search",
  // },
];
export default MenuNavbar;
