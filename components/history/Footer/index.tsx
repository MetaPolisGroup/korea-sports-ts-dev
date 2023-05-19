import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { IResponseData } from "@/pages/history";
import { DateConverter } from "@/helpers/date-converter";
import Popup, { PopupRef } from "@/components/ui/popup";
import { getDataCollectionSnapshort } from "@/lib/snapshort-func";
import { CurrencyConverter } from "@/helpers/currency-converter";
import betApi from "@/services/betApi";
import { useAppDispatch } from "@/store/hook";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import classes from "./Footer.module.css";

interface IFooterProps {
  data: IResponseData;

  removeItem: (idx: string) => void;
}

const convertMoney = (money: number) => {
  const roundedAmount = Math.round(money / 1000) * 1000;
  const formattedMoney = roundedAmount.toLocaleString("ko-KR") + "원";

  return formattedMoney;
};

const Footer: React.FC<IFooterProps> = (props) => {
  const { data, removeItem } = props;
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = React.createRef<PopupRef>();
  const [rules, setRules] = useState<any>([]);
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const [refundPercent, setRefundPercent] = useState(0);
  const time1 = new Date();
  const time2 = new Date(data.time);
  const diffInMilliseconds = Math.abs(+time2 - +time1);
  const diffInMinutes = diffInMilliseconds / 60000;

  const [isShow, setIsShow] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getDataCollectionSnapshort("preferences", (data) => setRules(data.data));
    const delayTime = rules[0]?.betting_cancel_refund.slice(-1)[0].time;
    if (diffInMinutes < 30) {
      const timer = setTimeout(() => {
        setShowCancel(true);
      }, delayTime * 60000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsShow(false);
  };

  const onConfirmCancel = () => {
    setIsLoading(true);
    for (let i in rules[0]?.betting_cancel_refund) {
      if (
        diffInMinutes > 0 &&
        diffInMinutes > rules[0]?.betting_cancel_refund[+i - 1]?.time &&
        diffInMinutes <= rules[0]?.betting_cancel_refund[i]?.time
      ) {
        setRefundPercent(rules[0]?.betting_cancel_refund[+i - 1].value);
      }
    }
  };

  const cancelBet = () => {
    betApi
      .cancelBet({
        betslipId: data.id,
        userId: data.user_id,
      })
      .then((res) => {
        if (res === true) {
          dispatch(
            setShowNotificationAlert({
              status: "success",
              title: "성공!",
              message: "베팅 취소가 성공했습니다!",
              isShow: true,
            })
          );
          setIsLoading(false);
        } else {
          dispatch(
            setShowNotificationAlert({
              status: "error",
              title: "에러!",
              message: res,
              isShow: true,
            })
          );
          setIsLoading(false);
        }
      });
  };

  return (
    <div
      style={{
        padding: "10px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "rgb(79 76 76)",
      }}
    >
      <span style={{ fontSize: 12 }}>
        {dayjs(data.created_at).format("YYYY-MM-DD HH:mm")}
      </span>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 12,
            gap: 3,
          }}
        >
          <span>
            베팅 X 총 배당률 = {data.amount.toLocaleString("es-US")} x{" "}
            <strong>
              {(+data.total_odds).toFixed(2)} ={" "}
              {convertMoney(Number(data.amount) * Number(data.total_odds))}
            </strong>
          </span>
        </div>
        <div style={{ fontSize: "12px" }}>
          보너스: {data.bonus.toLocaleString("es-US")}
        </div>
        <div style={{ fontSize: "14px" }}>
          <strong>승리금: {data.winning_amount.toLocaleString("es-US")}</strong>
        </div>
      </div>

      <div className={classes.boxBtn}>
        <Dialog
          open={isShow}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ backgroundColor: "#263041", color: "#fff" }}
          >
            Warning
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#263041", color: "#fff" }}>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "#fff" }}
            >
              모든 베팅 기록을 삭제하시겠습니까 {data.id}?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#263041", color: "#fff" }}>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                removeItem(data.id);
                handleClose();
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          variant="contained"
          className={classes.btnStatus}
          color={
            data.status === "win"
              ? "primary"
              : data.status !== "lost"
              ? "warning"
              : "error"
          }
        >
          {data.status}
        </Button>

        {showCancel && data.status !== "Cancel" ? (
          <Popup
            selector={
              <Button
                variant="contained"
                className={classes.btnCancel}
                color="error"
                sx={{ margin: "0 10px" }}
                onClick={() => {
                  onConfirmCancel();
                  popupRef.current?.open();
                }}
              >
                {isLoading ? <CircularProgress size={20} /> : "취소"}
              </Button>
            }
            content={
              <p>
                이 베팅을 취소하면 {refundPercent}% 총 금액이 환불됩니다. 당신의
                금액은{" "}
                <span style={{ color: "red" }}>
                  {" "}
                  {CurrencyConverter((refundPercent / 100) * data.amount)}{" "}
                </span>
                ?
              </p>
            }
            labelOk="CONFIRM"
            ref={popupRef}
            onSubmit={() => {
              cancelBet();
              popupRef.current?.close();
            }}
            onCancel={() => {
              popupRef.current?.close();
              setIsLoading(false);
            }}
          />
        ) : null}

        <Button
          className={classes.btnDel}
          style={{ color: "white", paddingLeft: 20 }}
          startIcon={<DeleteIcon />}
          onClick={() => setIsShow(true)}
        />
      </div>
    </div>
  );
};

export default Footer;
