import React from "react";
import Swap from "../swap";
import Cards from "./Card";
import Image from "next/image";
import classes from "./SlotProvider.module.css";

const SlotProvider = () => {
  return (
    <React.Fragment>
      <div className={classes["title-card"]}>
        <Image
          src="/images/logos/card_icon.png"
          width={25}
          height={25}
          alt="card icon"
          style={{ marginRight: "10px" }}
        />
        <h4>
          게임을 하시려면{" "}
          <span style={{ color: "yellow" }}>
            {" "}
            보유머니를 게임머니로 머니이동{" "}
          </span>
          을 하셔야 합니다.
        </h4>
      </div>
      <Swap />
      <Cards />
    </React.Fragment>
  );
};

export default SlotProvider;
