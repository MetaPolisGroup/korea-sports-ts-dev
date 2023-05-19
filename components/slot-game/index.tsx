import React from "react";
import css from "./index.module.css";
import Link from "next/link";
import { minigames, slotgames } from "@/data";
import Skeleton from "@mui/material/Skeleton";
import { isEmpty } from "lodash";
import GameCard from "./GameCard";

const SlotGame = () => {
  return (
    <div className={css["wrapper-minigame"]}>
      {!isEmpty(minigames) ? (
        slotgames.map((item) => (
          <Link href={item.link} key={item.id} legacyBehavior>
            <a target="_blank" rel="noreferrer">
              <GameCard key={item.id} game={item} />
            </a>
          </Link>
        ))
      ) : (
        <Skeleton variant="rounded" width={150} height={209} />
      )}
    </div>
  );
};

export default SlotGame;
