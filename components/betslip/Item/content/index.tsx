import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import css from "./index.module.css";
import { RootState } from "@/store";
import { removeItemCart } from "@/store/slices/betSlipSlice";
import Image from "next/image";
import { SPORT_ICON } from "@/constants";

interface betSlipData {
  betDetail: any;
}

interface ContentBetslipProps extends React.FC<betSlipData> {}

const ContentBetslip: ContentBetslipProps = ({ betDetail }) => {
  const dispatch = useAppDispatch();

  const { leagues, teams } = useAppSelector(
    (state: RootState) => state.countries
  );
  console.log({ betDetail });

  const leagueName = leagues.find(
    (league) => league.id === betDetail.league.id
  )?.korean_name;

  const homeName = teams.find(
    (team) => team.id === betDetail.home.id
  )?.korea_name;

  const awayName = teams.find(
    (team) => team.id === betDetail.away.id
  )?.korea_name;

  const handleCancelBetSlip = (oddData: any) => {
    dispatch(removeItemCart(oddData));
  };

  return (
    <div className={css.wrapper_content}>
      <div className={css.item_left}>
        <div onClick={() => handleCancelBetSlip(betDetail.odd)}>
          <CloseIcon />
        </div>
        <span className={css.odd}>{betDetail.odd.odds}</span>
      </div>
      <div className={css.item_right}>
        <span>{leagueName}</span>
        <span>
          {homeName} {awayName}
        </span>
        <span style={{ color: "var(--color-white)" }}>
          {betDetail.odd.team}
        </span>
      </div>
    </div>
  );
};

export default ContentBetslip;
