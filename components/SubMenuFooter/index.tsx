import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubMenu from "../layout/sub-menu";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import { gamesType, leagues, subMenuCasino, subMenuMiniGame } from "@/data";
import classes from "./SubMenuFooter.module.css";
import CloseIcon from "@mui/icons-material/Close";
import SportTypes from "../sport-type/sport-types";
import { TSubMenuFooter, TMenuItemsFooter } from "@/repositories/data";
import { RootState } from "@/store";
import { toggleShowBetSlip } from "@/store/slices/betSlipSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import BetSlip from "../betslip/betslip";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";
import BetSlipMobile from "../betslipMobile";

interface SubMenuFooterProp {
  dataSubMenu: TSubMenuFooter;
}

interface TSubMenu {
  id: number;
  name: string;
  url: string;
}

const SubMenuFooter: React.FC<SubMenuFooterProp> = ({ dataSubMenu }) => {
  const [isOpenDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const { showBet } = useAppSelector((state: RootState) => state.betSlip);

  const router = useRouter();
  const pathName = router?.pathname;

  const widthScreen = screen.width;

  const LIST_SHOW_BETSLIP = [
    "/oversea",
    "/domestic",
    "/live",
    "/oversea/[...slugoversea]",
  ];

  const { isOpen: isShowBetSlip } = useAppSelector(
    (state: RootState) => state.betSlip
  );
  const dispatch = useAppDispatch();

  const handleToggleDrawer = () => {
    return setOpenDrawer(!isOpenDrawer);
  };

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

  const renderContent = () => {
    const handleActionClick = ({ type }: { type: string | undefined }) => {
      if (type === "SPORT" || type === "CASINO") {
        setOpenDrawer((state) => !state);
      }

      if (type === "BETSLIP") {
        return dispatch(toggleShowBetSlip(!isShowBetSlip));
      }

      return null;
    };

    const renderListFeature = (listContent: TMenuItemsFooter[]) => {
      return (
        listContent?.map((item) => {
          if (!item?.typeAction)
            return (
              <div key={item.id} className={classes.item}>
                <Link href={item?.path ?? "/"}>
                  <div>{item.title}</div>
                  {item?.icon}
                </Link>
              </div>
            );

          if (item?.typeAction === "BETSLIP") {
            return (
              <div
                key={item.id}
                className={
                  item?.typeAction !== "BETSLIP"
                    ? classes.item
                    : `${classes.item} ${classes.itemBetslip}`
                }
                onClick={(e) => {
                  handleActionClick({ type: item?.typeAction });
                  e.preventDefault();
                  return e.stopPropagation();
                }}
              >
                <div>
                  <div>{item.title}</div>
                  {item?.icon}
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={
                item?.typeAction !== "BETSLIP"
                  ? classes.item
                  : `${classes.item} ${classes.itemBetslip}`
              }
            >
              <div
                onClick={(e) => {
                  handleActionClick({ type: item?.typeAction });
                  return e.stopPropagation();
                }}
              >
                <div>{item.title}</div>
                {item?.icon}
              </div>
            </div>
          );
        }) ?? null
      );
    };

    if (LIST_SHOW_BETSLIP?.includes(pathName)) {
      return renderListFeature(dataSubMenu?.sports);
    }

    if (pathName === "/casino" || pathName === "/mini-game") {
      return renderListFeature(dataSubMenu?.casino);
    }

    return renderListFeature(dataSubMenu?.default);
  };

  const renderContentDrawer = () => {
    const renderSubMenu = (dataSubMenu: TSubMenu[]) => {
      return (
        <div>
          <SubMenu data={dataSubMenu} isShowAllSizes />
        </div>
      );
    };

    if (pathName === "/mini-game") {
      return renderSubMenu(subMenuMiniGame);
    }

    if (pathName === "/casino") {
      return renderSubMenu(subMenuCasino);
    }

    return <SportTypes />;
  };

  const renderBetSlip = () => {
    return isShowBetSlip && showBet ? (
      <div className={classes.boxBetSlip}>
        {/* <BetSlip modeMobile onMessage={showNotifyHandler} /> */}
        <BetSlipMobile onMessage={showNotifyHandler} />
      </div>
    ) : null;
  };

  if (pathName === "/sports") return null;

  return (
    <div className={classes.subMenu}>
      {/* {widthScreen <= 1280 ? renderBetSlip() : null} */}
      {renderBetSlip()}
      <div
        className={
          LIST_SHOW_BETSLIP?.includes(pathName)
            ? `${classes.boxItemBet}`
            : classes.boxItem
        }
      >
        {renderContent()}

        <Drawer
          anchor="left"
          open={isOpenDrawer}
          onClose={() => handleToggleDrawer()}
        >
          <div className={classes.drawerContent}>
            <div className={classes.drawerHeader}>
              <CloseIcon onClick={() => handleToggleDrawer()} />
            </div>
            <div>{renderContentDrawer()}</div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default SubMenuFooter;
