import React from "react";
import Image from "next/image";
import classes from "./tracker.module.css";

const TrackerEvent = () => {
  return (
    <Image
      src="/images/games/tracker.png"
      alt="tracker"
      className={classes["custom-img"]}
      fill
    />
  );
};

export default TrackerEvent;
