import React from "react";
import MenuNavbar from "./menu-navbar/menu-navbar";
import classes from "./sport-types.module.css";
import PopularNow from "./popular-now/popular-now";
import GamesType from "./games-type/games-type";
import ListLeagues from "./listLeagues";
import { ECategories } from "@/store/Category/type";
import Skeleton from "@mui/material/Skeleton";
import useSwr from "swr";
import leaguesApi from "@/services/leaguesApi";
import LeftNavigation from "./left-navigation";

type TSport = {
  className?: string;
};
const SportTypes: React.FC<TSport> = ({ className }) => {
  const [active, setActive] = React.useState(ECategories.SOCCER);

  const {
    data: datas,
    error,
    isLoading,
    mutate,
  } = useSwr(`leagues`, {
    fetcher: async () => await leaguesApi.getCountries(),
  });

  const data = datas && datas.filter((data: any) => data.sports_id === active);

  return (
    <div className={`${classes["sport-types"]} ${className}`}>
      <MenuNavbar />
      <LeftNavigation />
      <PopularNow />
      <div className={classes["games-block"]}>
        <GamesType
          callback={async (id) => {
            await setActive(id);
            mutate(undefined);
          }}
          active={active}
        />
        <div className={classes["sport-types-header"]}>
          <h1>국가나 조직으로 선택</h1>
          {isLoading ? (
            Array(7)
              .fill(0)
              .map((i, idx) => {
                return (
                  <Skeleton
                    key={idx}
                    variant="text"
                    sx={{
                      fontSize: "1rem",
                      margin: "10px 10px",
                      background: "#19212b",
                    }}
                  />
                );
              })
          ) : (
            <ListLeagues list={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SportTypes;
