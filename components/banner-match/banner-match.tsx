import React from "react";
import classes from "./banner-match.module.css";
import Image from "next/image";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import { IMatchProps } from "@/repositories/data";
import { DateConverter } from "@/helpers/date-converter";
import { useAppSelector } from "@/store/hook";
import { listCategories } from "../categories";

interface IBannerMatchProps {
  detail: IMatchProps | undefined;
}

const BannerMatch: React.FC<IBannerMatchProps> = (props) => {
  const { category } = useAppSelector((state) => state.categorySlice);
  const { leagues } = useAppSelector((state) => state.countries);

  const categoriesSrc = listCategories.find(
    (category) => category.id.toString() === props.detail!.sport_id
  );

  const leagueName = leagues.find(
    (league) => league.id === props.detail?.league.id
  )?.korean_name;

  return (
    <div className={classes["match-infoHeader"]}>
      <div className={classes["league-name"]}>
        <img
          alt="logo"
          src={category.src ? category.src : categoriesSrc?.src}
          width={20}
          height={20}
        />
        <span>{leagueName}</span>
      </div>
      <div className={classes.teams}>
        <div className={classes["teams-name"]}>
          <div className={classes.home}>
            {/* <img
              src={
                props.detail?.home.image_id
                  ? `${props.detail?.home.image_id}`
                  : "/images/defaults/team.svg"
              }
              alt=""
              width={35}
              height={35}
            /> */}
            <span>{props.detail?.home.name}</span>
          </div>
          <div className={classes.time}>
            <span>
              {props.detail!.time && DateConverter(+props.detail!.time)}
            </span>
          </div>
          <div className={classes.away}>
            {/* <img
              src={
                props.detail?.away.image_id
                  ? `${props.detail?.away.image_id}`
                  : "/images/defaults/team.svg"
              }
              alt=""
              width={35}
              height={35}
            /> */}
            <span>{props.detail?.away.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerMatch;
