import React, { useState, useEffect } from "react";
import classes from "./sport.module.css";
import VideoBox from "./videoBox/videoBox";
import GameCard from "./gameCard/gameCard";
import Announcement from "./annoucement/announcement";
import { TypeListCard } from "@/repositories/data";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hook";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";

// const VideoBox = React.lazy(() => import("./videoBox/videoBox"));
// const GameCard = React.lazy(() => import("./gameCard/gameCard"));
// const Announcement = React.lazy(() => import("./annoucement/announcement"));

interface SportProps {
  dataGameCard?: TypeListCard[];
}

const Sport: React.FC<SportProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loginFormat = router?.query?.loginFormat;

    if (loginFormat === "signIn")
      dispatch(
        setShowNotificationAlert({
          status: "success",
          title: "성공",
          message: "계정 로그인 성공!",
          isShow: true,
        })
      );
    if (loginFormat === "signUp")
      dispatch(
        setShowNotificationAlert({
          status: "success",
          title: "성공",
          message: "성공적인 계정 등록!",
          isShow: true,
        })
      );
  }, []);

  return (
    <React.Fragment>
      <VideoBox
        linkVideo="/videos/sportsdemo.mp4"
        videoBoxClass={classes.videoBox}
      />
      <GameCard data={props!.dataGameCard} />
      {/* <Announcement /> */}
    </React.Fragment>
  );
};

export default Sport;
