import React from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./popular-now.module.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import useSwr from "swr";
import Skeleton from "@mui/material/Skeleton";
import leaguesApi from "@/services/leaguesApi";
import { SPORT_ICON } from "@/constants";

const PopularNow: React.FC = () => {
  const { data, isLoading } = useSwr(`popular-leagues`, {
    fetcher: async () => await leaguesApi.getPopularLeagues(),
  });

  return (
    <div className={classes["popular-now"]}>
      <div className={classes["popular-title"]}>
        <WhatshotIcon style={{ color: "#ed1d49" }} fontSize="small" />
        <span>지금 인기</span>
      </div>
      {data
        ? data.map(
            (league: {
              name: string;
              sport_id: string;
              image: string;
              id: string;
              count: number;
            }) => {
              return <ListLeagues key={league.id} league={league} />;
            }
          )
        : Array(7)
            .fill(0)
            .map((i, idx) => {
              return (
                <Skeleton
                  key={idx}
                  variant="rectangular"
                  width={288}
                  height={37}
                  style={{
                    background: "#19212b",
                    marginBottom: "6px",
                    padding: "5px 8px",
                    borderRadius: "8px",
                  }}
                />
              );
            })}
    </div>
  );
};

const ListLeagues: React.FC<{
  league: {
    name: string;
    sport_id: string;
    image: string;
    id: string;
    count: number;
  };
}> = ({ league }) => {
  return (
    <div className={classes["leagues-item"]}>
      <div className={classes["leagues-content"]}>
        <div className={classes["leagues-image"]}>
          <Image
            src={SPORT_ICON[league.sport_id as keyof typeof SPORT_ICON]}
            alt={league.name}
            width={14}
            height={14}
            loading="lazy"
          />
        </div>
        <img
          src={league.image}
          alt={league.name}
          width={20}
          height={15}
          style={{ marginLeft: "10px" }}
        />
        <div>
          <Link href={`/oversea/${league.sport_id}/${league.id}`}>
            <p className={classes["leagues-name"]}>{league.name}</p>
          </Link>
        </div>
      </div>
      <div className={classes["leagues-quality"]}>
        <span>{league && league.count}</span>
      </div>
    </div>
  );
};

export default React.memo(PopularNow);
