import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./minigame.module.css";
import { minigames } from "@/data";

interface IMiniGame {
  id: string;
  url: string;
  image: string;
  name?: string;
}

interface IMiniGameProps {
  className?: string;
  dataMiniGame?: IMiniGame[];
}

const MiniGame: React.FC<IMiniGameProps> = ({ dataMiniGame, className }) => {
  const renderDataGame = React.useCallback((data: IMiniGame[]) => {
    return data?.map((game) => {
      return (
        <div className={classes.game} key={game.id}>
          <Link href={game?.url} target="_blank">
            <div className={classes.content}>
              <div className={classes.name}>{game.name}</div>
              <Image
                src={game.image}
                alt="game-casino"
                width={250}
                height={180}
                loading='lazy'
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={classes.iconHover}>
              <Image
                src={"/images/casino/ico_play_01.png"}
                alt=""
                width={70}
                height={70}
                style={{ objectFit: "cover" }}
              />
            </div>
          </Link>
        </div>
      );
    });
  }, []);

  const renderedContent = React.useMemo(() => {
    return dataMiniGame?.length
      ? renderDataGame(dataMiniGame)
      : renderDataGame(minigames);
  }, [dataMiniGame, minigames, renderDataGame]);

  return (
    <div className={`${classes.minigame} ${className}`}>
      <div className={classes.boxGameContent}>{renderedContent}</div>
    </div>
  );
};

export default MiniGame;
