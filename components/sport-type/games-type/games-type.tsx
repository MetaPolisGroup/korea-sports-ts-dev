import React from "react";
import Image from "next/image";
import classes from "./games-type.module.css";
import Tooltip from "@mui/material/Tooltip";
import { gamesType } from "@/data";
import { ECategories } from "@/store/Category/type";

interface gamesTypeProps {
  callback: (id: ECategories) => void;
  active: ECategories;
}

const GamesType: React.FC<gamesTypeProps> = (props) => {
  const { callback, active } = props;

  return (
    <div className={classes.games}>
      <ul>
        {gamesType &&
          gamesType.map((gameType) => {
            return (
              <li
                key={gameType.id}
                className={active === gameType.id ? classes.active : ""}
                onClick={async () => callback(gameType.id)}
              >
                <button>
                  <Tooltip title={gameType.title} placement="right" arrow>
                    <Image
                      src={
                        active === gameType.id
                          ? gameType.acive_image
                          : gameType.image
                      }
                      alt={gameType.image + "'image"}
                      width={25}
                      height={25}
                      priority
                    />
                  </Tooltip>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default GamesType;
