import React, { useMemo } from "react";
import Image from "next/image";
import classes from "./gameCard.module.css";
import { TypeListCard } from "@/repositories/data";
import Link from "next/link";

interface GameCardProps {
  data?: TypeListCard[];
  className?: string;
  onClick?: (card: TypeListCard) => void;
}

const GameCard: React.FC<GameCardProps> = (props) => {
  const { data, onClick: onAction, className } = props;
  const renderListCard = useMemo(() => {
    return data?.map((card) => (
      <Link href={card.path!} key={card.id}>
        <Image
          src={card.image}
          alt={card.image + "'image"}
          priority
          width={500}
          height={500}
          className={classes.itemCard}
          onClick={() => onAction?.(card)}
        />
      </Link>
    ));
  }, [data, onAction]);

  if (data?.length === 0) return null;

  return (
    <div className={`${classes.listCard} ${className}`}>{renderListCard}</div>
  );
};

export default GameCard;

GameCard.defaultProps = {
  data: [],
  className: "",
  onClick: () => {},
};
