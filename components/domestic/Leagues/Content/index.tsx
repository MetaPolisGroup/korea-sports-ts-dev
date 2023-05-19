import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormToggle from "../FormToggle";
import css from "./index.module.css";
import Image from "next/image";
import Odd from "@/components/odd";
import Extends from "../Extends";
import dayjs from "dayjs";

import { IMatchProps } from "@/repositories/data";
import { DocumentData } from "firebase/firestore";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { listCategories } from "@/components/categories";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "@/helpers/db-config";

interface IContent {
  isShowExtends: boolean;
  isActive?: boolean;
  getValueToggle?: (data: string | number) => void;
  increment?: () => void;
  decrement?: () => void;
  handleShowOverseaDetail?: (id: string) => void;
  dataDetails: IMatchProps;
  listOdds?: DocumentData[];
  idMatch?: string;
  typeMatch: string;
}

const Content = (props: IContent) => {
  const [isOpen, setIsOpen] = useState(false);
  const [oddsData, setOddsData] = useState<DocumentData[]>([]);
  const [activeID, setActiveID] = useState<string>("");
  const { countries, leagues, teams } = useAppSelector(
    (state: RootState) => state.countries
  );

  useEffect(() => {
    let q: any;
    if (props.dataDetails.id) {
      q = query(
        collection(db, "odds"),
        where("FI", "==", props.dataDetails.id),
        where("type", "==", props.typeMatch)
      );
    }
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const data: DocumentData[] = [];
      querySnapshot.forEach((doc: any) => {
        data.push(doc.data());
      });
      setOddsData(data);
    });
    return () => {
      unsubscribe();
    };
  }, [props.dataDetails.id]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const imageSrc = countries.find(
    (country) => country.id === (props.dataDetails.league.cc ?? "null")
  )?.imgUrl;

  const leagueName = leagues.find(
    (league) => league.id === props.dataDetails.league.id
  )?.korean_name;

  const categoriesSrc = listCategories.find(
    (category) => category.id.toString() === props.dataDetails.sport_id
  );

  const activeOddButtonHandler = (id: string) => {
    setActiveID(id);
  };

  const sp = oddsData && oddsData[0]?.main?.sp;
  const length = sp && Object.keys(sp).length;

  const date = dayjs
    .unix(props.dataDetails.time as number)
    .format("DD-MM HH:mm");
  const { category } = useAppSelector((state) => state.categorySlice);

  // console.log(props.dataDetails);

  const homeName = teams.find(
    (team) => team.id === props.dataDetails.home.id
  )?.korea_name;

  const awayName = teams.find(
    (team) => team.id === props.dataDetails.away.id
  )?.korea_name;

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between">
        <div className={css["wrapper-title"]}>
          <span className={css["date"]}>{date}</span>
          <img alt="logo" src={categoriesSrc?.src} width={20} height={20} />
          <img
            alt="logo"
            src={imageSrc ? imageSrc : ""}
            width={20}
            height={15}
          />
          <span style={{ color: "#ffffff80", fontWeight: 600, fontSize: 12 }}>
            {leagueName}
          </span>
        </div>
        {!props.isShowExtends && (
          <div
            className={css["wrapper-title-right"]}
            onClick={() =>
              props.handleShowOverseaDetail?.(props.dataDetails.id)
            }
          >
            <span
              className={css["date"]}
              style={
                props.dataDetails.id === props.idMatch
                  ? { backgroundColor: "#2283f6" }
                  : undefined
              }
            >
              {length}
            </span>
          </div>
        )}
      </Box>
      <Box
        mt={2}
        mb={3}
        fontSize={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={
              props.dataDetails.home.image_id
                ? `${props.dataDetails.home.image_id}`
                : "/images/defaults/team.svg"
            }
            alt={props.dataDetails.home.name}
            style={{ marginRight: "5px", width: "20px", height: "20px" }}
          />
          <span>{homeName}</span>
          <span style={{ margin: "0px 10px" }}>VS</span>
          <img
            src={
              props.dataDetails.away.image_id
                ? `${props.dataDetails.away.image_id}`
                : "/images/defaults/team.svg"
            }
            alt={props.dataDetails.away.name}
            style={{ marginRight: "5px", width: "20px", height: "20px" }}
          />
          <span>{awayName}</span>
        </div> */}
        {props.dataDetails.ss ? (
          <div className={css["ss-sec"]}>
            <span className={css.ss}>
              {props.dataDetails?.ss?.substr(0, 1)}
            </span>
            <span style={{ margin: "0 10px" }}>VS</span>
            <span className={css.ss}>
              {props.dataDetails?.ss?.substr(-1, 1)}
            </span>
          </div>
        ) : null}
      </Box>
      <Box display="flex" gap={1} margin="3px 0">
        <FormToggle
          handle={(value, isCheck) => {
            if (isCheck) props.increment?.();
            else if (value === null) props.decrement?.();
            props.getValueToggle?.(value);
          }}
          dataDetails={props.dataDetails}
          listOdds={oddsData?.[0]?.main?.sp.full_time_result}
          onActive={activeOddButtonHandler}
          activeId={activeID}
        />

        {props.isShowExtends ? (
          <Odd
            typeButton="Button"
            style={{ minWidth: 30, width: 30 }}
            onClick={handleClick}
          >
            {!isOpen ? <AddIcon /> : <RemoveIcon />}
          </Odd>
        ) : null}
      </Box>
      {props.isShowExtends ? (
        <Extends
          open={isOpen}
          listOdds={oddsData?.[0]}
          dataDetails={props.dataDetails}
          onActive={activeOddButtonHandler}
          activeId={activeID}
        />
      ) : null}
    </React.Fragment>
  );
};
export default Content;
