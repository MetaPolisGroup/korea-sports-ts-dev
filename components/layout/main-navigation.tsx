import React from "react";
import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";

import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import ReorderIcon from "@mui/icons-material/Reorder";
import Image from "next/image";
import Profile from "../profile";

import { Button, Drawer } from "@mui/material";

import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { ListTypes } from "./constants";

import ListFeatureNav from "./ListFeatureNav";

const MainNavigation = () => {
  const [isShowDrawer, setShowDrawer] = React.useState({
    left: false,
    right: false,
  });

  const router = useRouter();
  const pathName = router.asPath;

  const { balance, point } = useAppSelector((state: RootState) => state.user);

  const toggleDrawer = (anchor: string, state: boolean) => {
    if (anchor === "left") {
      return setShowDrawer({
        left: state,
        right: false,
      });
    }

    return setShowDrawer({
      left: false,
      right: state,
    });
  };

  const renderContentLeftDrawer = () => {
    return (
      <>
        <ul>
          {ListTypes.map((i) => (
            <Link
              href={i.path}
              style={{
                color: pathName.includes(i.path) ? "#2283f6" : "",
              }}
              key={i.id}
            >
              <li>
                {pathName === i.path ? i.IconActive() : i.Icon()}
                <span>{i.name}</span>
              </li>
            </Link>
          ))}
        </ul>
        <div className={classes["footer-menu"]}>
          <div className={classes["term-conditions"]}>
            <h4>이용약관</h4>
            <h4>개인 정보 정책</h4>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={classes.headerKorea}>
      <header className={classes.header}>
        <div className={classes["header-left"]}>
          <Logo />
        </div>
        <div className={classes["header-right"]}>
          <ListFeatureNav />
        </div>

        <div className={classes["short-info"]}>
          <div>
            <Image
              src={"/images/icons/icons8-won-50.png"}
              width={18}
              height={18}
              alt="won"
            />
            <span>
              보유머니 <strong>{balance.toLocaleString("es-US")}</strong> 원
            </span>
          </div>
          <div className={classes["poin"]}>
            <div>P</div>
            <span>
              포인트 <strong>{point.toLocaleString("es-US")}</strong> 점
            </span>
          </div>
        </div>

        <div className={classes["responsive-header-left"]}>
          <Button variant="text" onClick={() => toggleDrawer("left", true)}>
            <ReorderIcon />
          </Button>
          <Drawer
            anchor="left"
            open={isShowDrawer.left}
            onClose={() => toggleDrawer("left", false)}
            className={classes.notShowDesk}
          >
            <div className={classes.drawerLeft}>
              <div className={classes.headerDrawer}>
                <Logo />
                <CloseIcon onClick={() => toggleDrawer("left", false)} />
              </div>
              <div className={classes.contentDrawer}>
                {renderContentLeftDrawer()}
              </div>
            </div>
          </Drawer>
        </div>
        <div className={classes["responsive-header-main"]}>
          <Logo />
        </div>
        <div className={classes["responsive-header-right"]}>
          <Button variant="text" onClick={() => toggleDrawer("right", true)}>
            <PersonIcon />
          </Button>
          <Drawer
            anchor="right"
            open={isShowDrawer.right}
            onClose={() => toggleDrawer("right", false)}
            className={classes.notShowDesk}
          >
            <div className={classes.drawerRight}>
              <div className={classes.headerDrawer}>
                <CloseIcon onClick={() => toggleDrawer("right", false)} />
              </div>
              <div className={classes.contentDrawer}>
                <Profile />
              </div>
            </div>
          </Drawer>
        </div>
      </header>

      <div className={classes["sub-header"]}>
        <ul>
          {ListTypes.map((i) => (
            <li key={i.id}>
              <Link
                href={i.path}
                className={classes["text"]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 10px",
                  color: pathName.includes(i.path) ? "#2283f6" : "",
                }}
              >
                {pathName.includes(i.path) ? i.IconActive() : i.Icon()}
                <span>{i.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainNavigation;
