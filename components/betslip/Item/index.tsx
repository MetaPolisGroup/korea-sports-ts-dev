import React, { useState } from "react";
import BallotIcon from "@mui/icons-material/Ballot";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import classess from "./index.module.css";
import Button from "@mui/material/Button";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentBetslip from "./content";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import {
  addTotalValueBet,
  clearBetSlip,
  setTotalBet,
  toggleShowBetSlip,
} from "@/store/slices/betSlipSlice";
import Popup, { PopupRef } from "@/components/ui/popup";
import { CircularProgress } from "@mui/material";
import { bettingRules } from "@/utils/betting-rules";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";
import betApi from "@/services/betApi";
import { isEmpty } from "lodash";

interface RenderOddBtn {
  onClickAmount: (data: any) => void;
}

interface ItemProps {
  onMessage: (
    status: string,
    tilte: string,
    message: string,
    isShow: boolean
  ) => void;
}

const Item: React.FC<ItemProps> = ({ onMessage }) => {
  const dispatch = useAppDispatch();
  const popupRef = React.createRef<PopupRef>();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [winningAmount, setWinningAmount] = useState<number>(0);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [dataBet, setDataBet] = useState({});

  const { betsData, isOpen, showBet, totalOdds, totalBet, potentialWin } =
    useAppSelector((state) => state.betSlip);

  const { id, balance, level } = useAppSelector(
    (state: RootState) => state.user
  );
  const { rules } = useAppSelector((state: RootState) => state.bettingRules);

  const rulesByLevel = rules?.betting_rules?.rules_by_level.find(
    (rule: any) => rule.level === level
  );

  React.useEffect(() => {
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

  const handleToggleBetSlip = () => {
    return dispatch(toggleShowBetSlip(!isOpen));
  };

  const onChangeTotalBetHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setTotalBet((e.target as HTMLInputElement).value));
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

  const clearBetSlipHandler = () => {
    dispatch(clearBetSlip());
  };

  return (
    <div className={classess.wrapper}>
      <div className={classess.wrapper_title}>
        <div
          className={classess.wrapper_title_left}
          onClick={() => handleToggleBetSlip()}
        >
          <BallotIcon />
          <h4>내기 전표</h4>
          {isOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </div>
        <Button
          startIcon={<DeleteIcon />}
          sx={{ color: "var(--color-white)" }}
          className={classess.clear_betslip}
          onClick={clearBetSlipHandler}
        >
          전체취소
        </Button>
      </div>
      {isOpen && !isEmpty(betsData) ? (
        <React.Fragment>
          <div
            style={{ maxHeight: 500, overflowY: "scroll", paddingLeft: "5px" }}
          >
            {betsData.map((betData: any) => (
              <ContentBetslip key={betData.id} betDetail={betData} />
            ))}
          </div>
          <div className={classess.wrapper_footer}>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="number"
                min={0}
                value={totalBet}
                onChange={onChangeTotalBetHandler}
              />
              <div className={classess.won}>
                <p>원</p>
              </div>
            </div>
            <RenderButton onClickAmount={handleAmount} />
            <div className={classess.wrapper_content}>
              <div className={classess.wrapper_content_left}>
                <p>총 배당</p>
                <p>보너스 배당</p>
                <p>총 배당금액</p>
                <p>최대 내기</p>
                <p>최소 베팅</p>
                <p>최대 위닝</p>
                <p>총 내기</p>
              </div>
              <div className={classess.wrapper_content_right}>
                <p>{totalOdds} 배</p>
                {rules?.betting_rules?.bonus?.available &&
                  (betsData.length >= 3 && betsData.length < 5 ? (
                    <p>{rules?.betting_rules?.bonus.three} 배</p>
                  ) : betsData.length >= 5 && betsData.length < 7 ? (
                    <p>{rules?.betting_rules?.bonus.five} 배</p>
                  ) : betsData.length >= 7 ? (
                    <p>{rules?.betting_rules?.bonus.seven} 배</p>
                  ) : (
                    betsData.length < 3 && <p>0 배</p>
                  ))}
                <p>{potentialWin.toLocaleString("es-US")} 원</p>
                <p>{rulesByLevel?.max_bet.toLocaleString("es-US")} 원</p>
                <p>{rulesByLevel?.min_bet.toLocaleString("es-US")} 원</p>
                <p>{rulesByLevel?.max_winning.toLocaleString("es-US")} 원</p>
                <p>{totalBet.toLocaleString("es-US")} 원</p>
              </div>
            </div>
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "4px",
              }}
            >
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
                      style={{ width: "50%" }}
                    >
                      배팅하기
                    </Button>
                  )
                }
                content={
                  <p>
                    베팅 금액:{" "}
                    <span style={{ color: "red" }}>
                      {amount.toLocaleString("es-US")}
                    </span>
                    . 예상 당첨 금액:{" "}
                    <span style={{ color: "red" }}>
                      {winningAmount.toLocaleString("es-US")}
                    </span>
                    . 위의 정보가 맞는지 확인하세요. 베팅 완료 후 15분 이내,
                    경기 시작 0분 전까지만 취소 가능합니다. 확인 버튼을 클릭하면
                    베팅이 완료됩니다.{" "}
                    <span style={{ color: "red" }}>확인 시간은 1분입니다.</span>
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
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ color: "#fff", width: "50%" }}
                onClick={clearBetSlipHandler}
              >
                전체취소
              </Button>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className={classess.empty}>
          <BookmarksIcon />
          <div>
            <p>당신의 베팅 장소</p>
            <p>선택 항목이 이 영역에 나타납니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;

const RenderButton: React.FC<RenderOddBtn> = React.memo(({ onClickAmount }) => (
  <div className={classess.wrapper_action}>
    {LIST_BUTTON.map((button) => {
      return (
        <Button
          style={{ minWidth: "46px", fontSize: "12px", padding: 0 }}
          variant="contained"
          onClick={() => {
            onClickAmount(button.value);
          }}
          key={button.id}
          // sx={
          //     betsData.length > 1
          //         ? { minWidth: "35px !important" }
          //         : null
          // }
        >
          {button.nameAmount}
        </Button>
      );
    })}
  </div>
));

const LIST_BUTTON = [
  {
    id: "bt1",
    nameAmount: "오천",
    value: 5000,
  },
  {
    id: "bt2",
    nameAmount: "일만",
    value: 10000,
  },
  {
    id: "bt3",
    nameAmount: "오만",
    value: 50000,
  },
  {
    id: "bt4",
    nameAmount: "십만",
    value: 100000,
  },
  {
    id: "bt5",
    nameAmount: "백만",
    value: 500000,
  },
  {
    id: "bt6",
    nameAmount: "max",
    value: "max",
  },
];
