import React, { useEffect, useState } from "react";

import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import authApi from "@/services/authApi";
import Drawer from "@mui/material/Drawer";

import ItemNoti from "./itemNotifications";
import { LIST_BTN_SUB } from "../constants";
import classes from "./ListFeatureNav.module.css";
import CloseIcon from "@mui/icons-material/Close";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { clearBetSlip } from "@/store/slices/betSlipSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { clearDataUser } from "@/store/slices/userSlipSlice";

import { clearAccessToken } from "@/store/slices/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import {
  onSnapshot,
  collection,
  DocumentData,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/helpers/db-config";
import { RootState } from "@/store";
import axiosClient from "@/services/axiosClient";

const ListFeatureNav: React.FC = () => {
  const [, setRefresh] = useState<boolean>(true);
  const [dataNotification, setDataNotification] = useState<any[]>();
  const [showAlertDetail, setShowAlertDetail] = useState<boolean>(false);
  const [showMore, setShowMore] = useState({
    pageCurrent: 1,
    quantity: 10,
  });

  const { id } = useAppSelector((state: RootState) => state.user);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("delete", "==", false),
      where("type", "==", "System"),
      where("status", "==", "Active"),
      where("users", "array-contains", id),
      orderBy("created_at", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const data: DocumentData[] = [];
      querySnapshot.forEach((doc: any) => {
        data.push(doc.data());
      });
      setDataNotification(data as any);
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleSetReaded = (idNotification: string | null = null) => {
    // Del all
    if (idNotification === null)
      return axiosClient.post(`/user/read-all-notifications/${id}`);

    // Del one
    return axiosClient.post(`/user/read-notifications/${idNotification}`);
  };

  const handleLogOut = () => {
    dispatch(clearDataUser());
    dispatch(clearAccessToken());
    dispatch(clearBetSlip());
    const res = authApi.logout();
    res.then((re) => console.log(re));
  };

  const handleChangePage = (type: string) => {
    if (type === "deposit") return router.push("/deposit");
    if (type === "withdraw") return router.push("/withdraw");
    if (type === "customerSV") return router.push("/customer-service");
    if (type === "mail") return router.push("/sending-note");
    if (type === "logout") return handleLogOut();
  };

  const toggleDrawer = () => {
    setShowAlertDetail(!showAlertDetail);
  };

  const renderTime = () => {
    const _date = new Date();

    const _koreanTime = _date.toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    setTimeout(() => {
      setRefresh((state) => !state);
    }, 500);

    return <div className={classes["time"]}>GMT+9 {_koreanTime}</div>;
  };

  const renderListBtn = () =>
    LIST_BTN_SUB?.map((btn) => {
      if (btn?.value === "notificationsIcon") {
        const classDefault = classes[`${btn.value}`];
        const _ListNotiUnread =
          dataNotification?.filter((item) => item?.read === false) ?? [];

        return (
          <div
            key={btn.id}
            className={classes.alert}
            onClick={() => toggleDrawer()}
          >
            <button
              className={
                showAlertDetail
                  ? `${classDefault} ${classes.active}`
                  : classDefault
              }
              onClick={() => handleChangePage(btn?.value)}
            >
              {btn.icon} {btn.title}
            </button>
            {!isEmpty(_ListNotiUnread) ? (
              <div>{_ListNotiUnread?.length}</div>
            ) : null}
          </div>
        );
      }

      return (
        <button
          key={btn.id}
          className={classes[`${btn.value}`]}
          onClick={() => handleChangePage(btn?.value)}
        >
          {btn.icon} {btn.title}
        </button>
      );
    });

  const renderNotifications = () => {
    const _quantityShow = showMore.pageCurrent * showMore.quantity;

    return dataNotification?.slice(0, _quantityShow)?.map?.((item) => {
      return <ItemNoti key={item?.id} data={item} onDelete={handleSetReaded} />;
    });
  };

  const renderBtnShowMore = () => {
    if (isEmpty(dataNotification)) return null;

    const _quantityShow = showMore.pageCurrent * showMore.quantity;

    if (_quantityShow >= dataNotification!.length) return null;
    return (
      <div className={classes.boxBtn}>
        <button
          onClick={() =>
            setShowMore({ ...showMore, pageCurrent: showMore.pageCurrent + 1 })
          }
        >
          자세히보기
        </button>
      </div>
    );
  };

  return (
    <div className={classes["header-mid"]}>
      <AccessTimeIcon />
      {renderTime()}
      {renderListBtn?.()}

      <Drawer
        anchor="right"
        open={showAlertDetail}
        onClose={toggleDrawer}
        className={classes.drawerAlert}
      >
        <div className={classes.body}>
          <div>
            <div className={classes.title}>
              <div>알림</div>
              <div>
                <CloseIcon onClick={toggleDrawer} />
              </div>
            </div>

            <div className={classes.content}>
              {renderNotifications()}
              {renderBtnShowMore()}
            </div>
          </div>

          <div onClick={() => handleSetReaded()}>
            모두 읽음으로 표시 <TaskAltIcon />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ListFeatureNav;
