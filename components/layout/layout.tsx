import Head from "next/head";
import React from "react";
import Profile from "../profile";
import SportTypes from "../sport-type/sport-types";
import SportLogo from "../SportLogo";
import SubMenuFooter from "../SubMenuFooter";
import Footer from "./footer";
import MainNavigation from "./main-navigation";
import SubMenu from "./sub-menu";
import Badge from "@mui/material/Badge";
// const SubMenu = React.lazy(() => import('./sub-menu'))
// const Footer = React.lazy(() => import('./footer'))
// const Head = React.lazy(() => import('next/head'))
// const SubMenuFooter = React.lazy(() => import('../SubMenuFooter'))
// const SportLogo = React.lazy(() => import('../SportLogo'))
// const SportTypes = React.lazy(() => import('../sport-type/sport-types'))
// const Profile = React.lazy(() => import('../profile'))
// const MainNavigation = React.lazy(() => import('./main-navigation'))
import { useRouter } from "next/router";
import classes from "./layout.module.css";
import BallotIcon from "@mui/icons-material/Ballot";

import {
  leaguesLogo,
  subMenuCasino,
  subMenuFooter,
  subMenuMiniGame,
} from "@/data";
import {
  getDataCollectionSnapshort,
  loadFirstPageSnapshort,
} from "@/lib/snapshort-func";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setDisableShowNotificationAlert,
  setShowNotificationAlert,
} from "@/store/slices/uiSlice";
import axios from "axios";
import BetSlip from "../betslip/betslip";
import NotificationAlert from "../ui/notification-alert";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { toggleShowBetSlip } from "@/store/slices/betSlipSlice";

import ClickAwayListener from "@mui/base/ClickAwayListener";
import Item from "../betslip/Item";
import { isEmpty } from "lodash";

export type ILayout = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const mainTitle = "Sport Bet";

const Layout: React.FC<ILayout> = (props) => {
  const router = useRouter();
  const pathName = router.pathname;
  const dispatch = useAppDispatch();

  const { isOpen, showBet, betsData } = useAppSelector(
    (state: RootState) => state.betSlip
  );
  const [resIp, setResIp] = React.useState([""]);

  const consentList = [
    "/oversea",
    "/domestic",
    "/live",
    "/oversea/[...slugoversea]",
  ];
  const pagesShowSportTypes = [
    "/sports",
    "/domestic",
    "/oversea",
    "/domestic/[...slug]",
    "/live",
    "/event",
    "/betting-rules",
    "/announcement",
    "/customer-service",
    "/history",
    "/cash-history",
    "/deposit",
    "/withdraw",
    "/virtual",
    "/slot-provider",
    "/slot-game",
    "/casino",
    "/slot-provider/[...slugProvider]",
    "/point",
    "/sending-note",
    "/oversea/[...slugoversea]",
  ];

  const isPageShowBetslip = consentList?.includes(pathName);

  const { status, title, message, isShow } = useAppSelector(
    (state: RootState) => state.ui
  );

  const token = useAppSelector((state) => state.token.access_token);

  const data: any = [];

  const widthScreen = screen.width;

  const showNotifyHandler = (
    status: string,
    title: string,
    message: string
  ) => {
    dispatch(
      setShowNotificationAlert({
        status: status,
        title: title,
        message: message,
        isShow: true,
      })
    );
  };

  const handleBlockIp = async () => {
    await getDataCollectionSnapshort("preferences", async (data) => {
      await axios.get("https://api.ipify.org/?format=json").then((i) => {
        const isCheck = data.data[0]?.general.ip_block.find(
          (a: { value: string }) => a.value === i.data.ip
        );
        if (isCheck) router.push("/404");
      });
    });
  };

  React.useEffect(() => {
    handleBlockIp();
  }, []);

  React.useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  React.useEffect(() => {
    let timer: any;
    if (isShow) {
      timer = setTimeout(() => {
        dispatch(setDisableShowNotificationAlert());
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isShow]);

  const subMenuLayout = pagesShowSportTypes?.includes(pathName) ? (
    <SportTypes className={classes["only-desktop"]} />
  ) : (
    <SubMenu data={pathName === "/casino" ? subMenuCasino : subMenuMiniGame} />
  );

  return (
    <>
      <Head>
        <title>{mainTitle + " | " + props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logos/danang_favicon.svg" />
      </Head>
      <NotificationAlert
        status={status}
        title={title}
        message={message}
        showNotify={isShow}
      />
      <div className={`${classes.content}`}>
        <MainNavigation />

        <main className={classes.mainStyle}>
          {subMenuLayout}
          <div className={classes.boxChildren}>
            <div>{props.children}</div>
            <SportLogo dataLogosFooter={leaguesLogo} />
          </div>
          <Profile className={classes["only-desktop"]} />
        </main>
        {/* <BetSlip onMessage={showNotifyHandler} /> */}

        {isPageShowBetslip ? (
          <div
            style={{
              position: "fixed",
              bottom: isOpen ? -106 : 0,
              right: 0,
              height: isOpen ? "100vh" : undefined,
              backgroundColor: "var(--color-darkblue-800)",
              overflowY: "scroll",
            }}
          >
            <Item onMessage={showNotifyHandler} />
          </div>
        ) : null}

        <SubMenuFooter dataSubMenu={subMenuFooter} />

        {!showBet && !isEmpty(betsData) && isPageShowBetslip && (
          <div
            onClick={(e) => {
              dispatch(toggleShowBetSlip(true));
              e.stopPropagation();
            }}
            className={classes["bet-mobile"]}
            style={{ background: "var(--color-blue)", padding: 20 }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <div
                  style={{
                    color: "white",
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 50,
                    marginBottom: 50,
                    background: "red",
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    borderRadius: "100%",
                  }}
                >
                  <span>{betsData.length}</span>
                </div>
              }
            >
              <BallotIcon
                fontSize="medium"
                color="action"
                style={{ color: "white" }}
              />
            </Badge>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
