import React from "react";
import Link from "next/link";
import Image from "next/image";
import { casinoGames } from "@/data";
import classes from "./casino.module.css";
import Categories from "../categories";
import Swap from "../swap";

interface CasinoGame {
  id: string;
  link: string;
  image: string;
  name: string;
}

interface CasinoProps {
  className?: string;
  dataGameCasino?: CasinoGame[];
}

const Casino: React.FC<CasinoProps> = ({ dataGameCasino, className }) => {
  const renderDataCasino = React.useCallback((data: CasinoGame[]) => {
    return data?.map((game) => {
      return (
        <div className={classes.game} key={game.id}>
          <Link href={game?.link} target="_blank">
            <div className={classes.content}>
              <div className={classes.name}>{game.name}</div>
              <Image
                src={game.image}
                alt="game-casino"
                width={250}
                height={180}
                loading="lazy"
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
    return dataGameCasino?.length
      ? renderDataCasino(dataGameCasino)
      : renderDataCasino(casinoGames);
  }, [dataGameCasino, casinoGames, renderDataCasino]);

  return (
    <div className={`${classes.casino} ${className}`}>
      <div className={classes.title}>
        <div>
          <Image
            src={"/images/casino/title_casino.png"}
            alt="title"
            width={70}
            height={70}
          />
        </div>
        <div>
          <Categories title="바카라" isShowLogoRight />
          <p>
            총 <span>10개의</span> 라이브 카지노 게임 제공사가 준비되어
            있습니다.
          </p>
        </div>
      </div>
      <Swap />
      <div className={classes.boxGameContent}>{renderedContent}</div>
    </div>
  );
};

export default Casino;

Casino.defaultProps = {
  className: "",
  dataGameCasino: [],
};
