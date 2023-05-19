import React, { useEffect, useState } from "react";
import classes from "./betslip.module.css";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BallotIcon from "@mui/icons-material/Ballot";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setTotalBet,
  removeItemCart,
  addTotalValueBet,
  toggleShowBetSlip,
  clearBetSlip,
} from "@/store/slices/betSlipSlice";
import { RootState } from "@/store";
import CircularProgress from "@mui/material/CircularProgress";
import { isEmpty } from "lodash";
import { CurrencyConverter } from "@/helpers/currency-converter";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";
import Popup, { PopupRef } from "../ui/popup";
import { bettingRules } from "@/utils/betting-rules";
import betApi from "@/services/betApi";
import Image from "next/image";
import { SPORT_ICON } from "@/constants";

import ClickAwayListener from "@mui/base/ClickAwayListener";

interface BetSlipProps {
  modeMobile?: boolean;
  onMessage: (
    status: string,
    tilte: string,
    message: string,
    isShow: boolean
  ) => void;
}

const BetSlip: React.FC<BetSlipProps> = ({ modeMobile, onMessage }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [winningAmount, setWinningAmount] = useState<number>(0);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [dataBet, setDataBet] = useState({});

  const { betsData, isOpen, totalOdds, totalBet, potentialWin } =
    useAppSelector((state: RootState) => state.betSlip);

  const { id, balance, level } = useAppSelector(
    (state: RootState) => state.user
  );

  const { rules } = useAppSelector((state: RootState) => state.bettingRules);

  const popupRef = React.createRef<PopupRef>();
  const mainClassName = modeMobile
    ? `${classes.betSlip} ${classes.betSlipMobile}`
    : `${classes.betSlip}`;

  useEffect(() => {
    let timer: any;
    if (isShowConfirm) {
      timer = setTimeout(() => {
        setIsShowConfirm(false);
        setIsLoading(false);
      }, 60000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isShowConfirm]);

  const rulesByLevel = rules?.betting_rules?.rules_by_level.find(
    (rule: any) => rule.level === level
  );

  const handleCancelBetSlip = (oddData: any) => {
    dispatch(removeItemCart(oddData));
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setIsLoadingConfirm(true);
    betApi
      .bet(data)
      .then((response) => {
        setIsLoading(false);
        setIsLoadingConfirm(false);
        setIsShowConfirm(false);
        onMessage("success", "성공", "베팅 성공!", true);
        dispatch(clearBetSlip());
      })
      .catch((err) => {
        setIsLoadingConfirm(false);
        setIsLoading(false);
      });
  };

  const handleToggleBetSlip = () => {
    return dispatch(toggleShowBetSlip(!isOpen));
  };

  const onChangeTotalBetHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setTotalBet((e.target as HTMLInputElement).value));
  };

  const RenderArrow = () => {
    return isOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />;
  };

  const onConfirm = async () => {
    setIsLoading(true);
    const betsMatchData = betsData.map((betData) => ({
      matchId: betData.id,
      oddType: betData.odd_types,
      id: betData.odd.id,
      odds: betData.odd.odds,
    }));

    const data: any = {
      userId: id,
      amount: totalBet,
      betting: betsMatchData,
    };

    setDataBet(data);

    if (totalBet > balance) {
      setIsLoading(false);

      onMessage(
        "error",
        "에러",
        "잔액이 부족합니다. 계정을 충전해 더 많은 베팅을 할 수 있습니다.",
        true
      );
      return;
    }

    if (totalBet === 0) {
      setIsLoading(false);
      onMessage("error", "에러", "베팅 금액을 입력하세요!", true);
      return;
    }

    const isValidBet = bettingRules(rules, level, data);
    if (!isValidBet.isValid) {
      dispatch(
        setShowNotificationAlert({
          status: "error",
          title: "에러",
          message: isValidBet.message,
          isShow: true,
        })
      );
      setIsLoading(false);
      return;
    }

    betApi
      .confirmBet(data)
      .then((responseConfirm) => {
        setAmount(responseConfirm.amount);
        setWinningAmount(responseConfirm.winningAmount);
        setIsShowConfirm(true);
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(clearBetSlip());
        onMessage("error", "에러", err.message, true);
        // dispatch(
        //   setShowNotificationAlert({
        //     status: "error",
        //     title: "에러",
        //     message: err.message,
        //     isShow: true,
        //   })
        // );
      });
  };

  const handleAmount = (value: string | number) => {
    const rulesByLevel = rules?.betting_rules?.rules_by_level.find(
      (rule: any) => rule?.level === level
    );

    if (value === "max") {
      if (
        betsData.length < 2 &&
        balance > rulesByLevel.danpole_betting_amount
      ) {
        return dispatch(addTotalValueBet(+rulesByLevel.danpole_betting_amount));
      }
      if (
        betsData.length < 2 &&
        balance <= rulesByLevel.danpole_betting_amount
      ) {
        return dispatch(addTotalValueBet(+balance));
      }
      if (balance > rulesByLevel.max_bet) {
        return dispatch(addTotalValueBet(+rulesByLevel.max_bet));
      }
      if (balance <= rulesByLevel.max_bet) {
        return dispatch(addTotalValueBet(balance));
      }
    } else {
      dispatch(addTotalValueBet(value));
    }
  };

  const clearBetSlipHandler = () => {
    dispatch(clearBetSlip());
  };

  const RenderBoostOdd: React.FC<{ odd: string }> = ({ odd }) => {
    return (
      <div className={`${classes.mainContent} ${classes.boostOdd}`}>
        <div className={classes.boxClose}>
          <button disabled style={{ cursor: "default" }}>
            {/* <CloseIcon /> */}
          </button>
        </div>
        <div className={classes.info}>
          <div className={classes.matchName}>
            <p>추가 보너스 비율</p>
          </div>
          <div className={classes.subMatchName}></div>
          <div className={classes.exchangeRate}>
            <div className={classes.betting}>{odd}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setTimeout(() => {
          if (isOpen) {
            return dispatch(toggleShowBetSlip(false));
          }
        }, 1);
      }}
    >
      <div className={mainClassName}>
        <div className={classes.boxTitle} onClick={() => handleToggleBetSlip()}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <BallotIcon />
            <div className={classes.title}>내기 전표</div>
            <RenderArrow />
          </div>
          {!isEmpty(betsData) ? (
            <Button
              // startIcon={<DeleteIcon />}
              sx={{
                color: "#fff",
                border: "none",
                textTransform: "capitalize",
                fontSize: "16px",
                marginTop: "2px",
              }}
              onClick={clearBetSlipHandler}
            >
              전체취소
            </Button>
          ) : null}
        </div>
        <form className={classes.formBest}>
          <div className={classes.boxContent}>
            {!isEmpty(betsData) ? (
              <React.Fragment>
                <div className={classes["betData-block"]}>
                  {betsData.map((betData) => (
                    <div className={classes.mainContent} key={betData.odd.id}>
                      <div className={classes.boxClose}>
                        <button
                          onClick={() => handleCancelBetSlip(betData.odd)}
                        >
                          <CloseIcon />
                        </button>
                      </div>
                      <div className={classes.info}>
                        <div className={classes.matchName}>
                          <Image
                            src={
                              SPORT_ICON[
                              betData?.sport_id as keyof typeof SPORT_ICON
                              ]
                            }
                            alt={betData?.sport_id}
                            width={15}
                            height={15}
                          />
                          <p>
                            {betData?.odd.team
                              ? betData?.odd.team
                              : betData?.odd.header}
                          </p>
                        </div>
                        <div className={classes.subMatchName}>
                          {betData?.home.name} vs {betData?.away.name}
                        </div>
                        <div className={classes.exchangeRate}>
                          <div className={classes.betting}>
                            {betData?.odd.odds}
                          </div>
                          {betsData.length === 1 ? (
                            <div className={classes.inputMoney}>
                              <div className={classes.icon}>원</div>
                              <input
                                type="number"
                                min={0}
                                value={totalBet}
                                className={classes.styleInput}
                                onChange={onChangeTotalBetHandler}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                  {rules?.betting_rules?.bonus?.available &&
                    (betsData.length >= 3 && betsData.length < 5 ? (
                      <RenderBoostOdd odd={rules?.betting_rules?.bonus.three} />
                    ) : betsData.length >= 5 && betsData.length < 7 ? (
                      <RenderBoostOdd odd={rules?.betting_rules?.bonus.five} />
                    ) : (
                      betsData.length >= 7 && (
                        <RenderBoostOdd
                          odd={rules?.betting_rules?.bonus.seven}
                        />
                      )
                    ))}
                </div>

                {betsData.length > 1 ? (
                  <div className={classes.inputMoney}>
                    <input
                      type="number"
                      min={0}
                      value={totalBet}
                      className={classes.styleInput}
                      onChange={onChangeTotalBetHandler}
                    />
                    <div className={`${classes.icon} ${classes["icon-won"]}`}>
                      원
                    </div>
                  </div>
                ) : null}
                <div className={classes.offer}>
                  {LIST_BUTTON.map((button) => {
                    return (
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleAmount(button.value);
                        }}
                        key={button.id}
                        sx={
                          betsData.length > 1
                            ? { minWidth: "35px !important" }
                            : null
                        }
                      >
                        {button.nameAmount}
                      </Button>
                    );
                  })}
                </div>
                <div className={classes.totalGray}>
                  <p>최대 내기</p>
                  <p>{(rulesByLevel?.max_bet).toLocaleString("es-US")}</p>
                </div>
                <div className={classes.totalGray}>
                  <p>최소 베팅</p>
                  <p>{rulesByLevel?.min_bet.toLocaleString("es-US")}</p>
                </div>
                <div className={classes.totalGray}>
                  <p>최대 위닝</p>
                  <p>{rulesByLevel?.max_winning.toLocaleString("es-US")}</p>
                </div>
                <div className={classes.totalGray}>
                  <p>총 배당률</p>
                  <p>{totalOdds}</p>
                </div>
                <div className={classes.totalGray}>
                  <p>총 내기</p>
                  <p>{totalBet.toLocaleString("es-US")}</p>
                </div>
                <div className={classes.total}>
                  <p>잠재적 승리</p>
                  <p>{potentialWin.toLocaleString("es-US")}</p>
                </div>

                <div className={classes.submit}>
                  <Popup
                    selector={
                      isLoading ? (
                        <Button variant="contained">
                          <CircularProgress size={20} sx={{ color: "white" }} />
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => {
                            onConfirm();
                          }}
                        >
                          배팅하기
                        </Button>
                      )
                    }
                    content={
                      <p>
                        베팅 금액:{" "}
                        <span style={{ color: "red" }}>
                          {CurrencyConverter(+amount)}
                        </span>
                        . 예상 당첨 금액:{" "}
                        <span style={{ color: "red" }}>
                          {CurrencyConverter(+winningAmount)}
                        </span>
                        . 위의 정보가 맞는지 확인하세요. 베팅 완료 후 15분 이내,
                        경기 시작 0분 전까지만 취소 가능합니다. 확인 버튼을
                        클릭하면 베팅이 완료됩니다.{" "}
                        <span style={{ color: "red" }}>
                          확인 시간은 1분입니다.
                        </span>
                      </p>
                    }
                    isShow={isShowConfirm}
                    ref={popupRef}
                    onSubmit={() => {
                      handleSubmit(dataBet);
                      popupRef.current?.close;
                    }}
                    // closable={false}
                    onCancel={() => {
                      setIsShowConfirm(false);
                      setIsLoading(false);
                    }}
                    okLoading={isLoadingConfirm}
                    labelOk="CONFIRM"
                  />
                  {/* <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{ marginTop: "10px", color: "#fff" }}
                  onClick={clearBetSlipHandler}
                >
                  Clear BetSlip
                </Button> */}
                </div>
              </React.Fragment>
            ) : (
              <div className={classes.empty}>
                <BookmarksIcon />
                <div>
                  <p>당신의 베팅 장소</p>
                  <p>선택 항목이 이 영역에 나타납니다.</p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </ClickAwayListener>
  );
};

export default BetSlip;

BetSlip.defaultProps = {
  modeMobile: false,
};

const LIST_BUTTON = [
  {
    id: "bt1",
    nameAmount: "+5,000",
    value: 5000,
  },
  {
    id: "bt2",
    nameAmount: "+10,000",
    value: 10000,
  },
  {
    id: "bt3",
    nameAmount: "+50,000",
    value: 50000,
  },
  {
    id: "bt4",
    nameAmount: "+100,000",
    value: 100000,
  },
  {
    id: "bt5",
    nameAmount: "+500,000",
    value: 500000,
  },
  {
    id: "bt6",
    nameAmount: "최대",
    value: "max",
  },
];
