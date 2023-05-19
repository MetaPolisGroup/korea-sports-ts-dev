import React from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const LeagueItem = (props: any) => {
  const { leagues } = props
  return (
    <Link href="/">
      <p>
        {leagues?.league?.image ? (
          <Image
            src={leagues?.league?.image}
            alt={leagues?.league?.name}
            width={20}
            height={20}
          />
        ) : null}

        {leagues?.league?.name}
      </p>
      <ArrowForwardIcon fontSize="small" />
    </Link>
  );
};

export default LeagueItem;
