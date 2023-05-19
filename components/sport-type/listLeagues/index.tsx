import React, { useState } from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { DocumentData } from "@firebase/firestore-types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import css from "./index.module.css";
import Link from "next/link";
import { isEmpty } from "lodash";
import EmptyData from "@/components/ui/EmptyData/input";

type TProps = {
  list: DocumentData[];
};

const ListLeagues: React.FC<TProps> = (props) => {
  const { list } = props;

  return (
    <div className={css.leagues}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        sx={{
          height: 600,
          overflowY: "scroll",
        }}
      >
        {!isEmpty(list) ? (
          list?.[0]?.countries.map((item: any) => (
            <ListCountriesItem
              key={item.id}
              item={item}
              image={item.image}
              sportId={list?.[0].sports_id}
            />
          ))
        ) : (
          <EmptyData message="Not found countries!" />
        )}
      </List>
      {/* <LoadMore<DocumentData>
        typeScroll="Array"
        initialData={list}
        render={(item, handleScroll) => {
          return (
          );
        }}
      /> */}
    </div>
  );
};

const ListCountriesItem: React.FC<{
  item: any;
  image: string;
  sportId: string;
}> = ({ item, image, sportId }) => {
  const [showLeagues, setShowLeagues] = useState<boolean>(false);

  const toggleShowLeaguesHandler = () => {
    setShowLeagues((prevShowLeagues) => !prevShowLeagues);
  };

  const totalMatchs =
    item &&
    item?.leagues.reduce((accumalator: number, currentValue: any) => {
      return (accumalator += currentValue.countMatch);
    }, 0);

  return (
    <>
      <ListItemButton
        onClick={toggleShowLeaguesHandler}
        sx={{
          borderBottom: "1px solid #343434",
        }}
        style={{
          padding: "8px 6px",
        }}
      >
        <img
          src={image && image}
          width={20}
          height={15}
          alt={image}
          style={{ marginRight: "5px" }}
        />
        <ListItemText primary={item.name} />
        <ListItemText
          primary={totalMatchs}
          sx={{ textAlign: "right" }}
          className={css.countMatch}
        />
      </ListItemButton>

      {showLeagues
        ? item.leagues.map((league: any) => {
            return (
              <ListLeaguesItem
                key={league.id}
                item={league}
                sportId={sportId}
              />
            );
          })
        : null}
    </>
  );
};

const ListLeaguesItem: React.FC<{
  item: any;
  sportId: string;
}> = ({ item, sportId }) => {
  return (
    <Link href={`/oversea/${sportId}/${item.id}`}>
      <ListItemButton
        sx={{
          padding: "8px 6px",
          borderBottom: "1px solid #343434",
        }}
      >
        <ArrowForwardIosIcon
          sx={{ color: "#ffffff80", fontSize: "14px", marginRight: "5px" }}
        />
        <ListItemText primary={item.name} sx={{ color: "#ffffff80" }} />
        <ListItemText
          primary={item.countMatch}
          sx={{ textAlign: "right" }}
          className={css.countMatch}
        />
      </ListItemButton>
    </Link>
  );
};
export default ListLeagues;
