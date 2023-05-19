import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import moneyApi from "@/services/moneyApi";
import { Box, Typography, FormControl, OutlinedInput } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { columns } from "./columns";
import classes from "./index.module.css";
import { DocumentData } from "@firebase/firestore-types";
import { IPaymentData } from "./columns";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/helpers/db-config";

const styles = {
  inputTitle: {
    padding: "0 14px",
    fontSize: "14px",
    fontWeight: 600,
  },
  inputValue: {
    bgcolor: "#1c2532",
    color: "white",
    borderRadius: "5px",
    padding: "16px 14px",
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    width: "100%",
    padding: "0 0 24px",
  },
  moneyButton: {
    bgcolor: "#ffffff80",
    margin: "5px 5px",
  },
  deleteButton: {
    display: "flex",
    justifyContent: "center",
    margin: "5px",
    bgcolor: "red",
    minWidth: "10px",
  },
  submitButton: {
    width: "50%",
    bgcolor: "#2283f6",
    color: "#fff",
  },
};
const Withdraw = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState(0);
  const [withdrawalHistory, setWithdrawalHistory] =
    React.useState<DocumentData>([]);

  const { id, balance, point } = useAppSelector(
    (state: RootState) => state.user
  );

  const { rules } = useAppSelector((state: RootState) => state.bettingRules);

  const dispatch = useAppDispatch();

  const handleWithdraw = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (amount === 0) {
      dispatch(
        setShowNotificationAlert({
          status: "error",
          title: "에러",
          message: "입금액은 0보다 커야 합니다!",
          isShow: true,
        })
      );
      setIsLoading(false);
      return;
    }

    if (balance < amount) {
      dispatch(
        setShowNotificationAlert({
          status: "error",
          title: "에러",
          message: "균형이 충분하지 않다!",
          isShow: true,
        })
      );
      setIsLoading(false);
      return;
    }

    const res = moneyApi.post({
      amount,
      type: "Withdraw",
      user_id: id!,
    });

    res.then((res) => {
      if (res === true) {
        dispatch(
          setShowNotificationAlert({
            status: "success",
            title: "성공",
            message: "출금 요청이 성공했습니다!",
            isShow: true,
          })
        );
        setIsLoading(false);
      } else {
        dispatch(
          setShowNotificationAlert({
            status: "error",
            title: "에러",
            message: res.response.data.message,
            isShow: true,
          })
        );
        setIsLoading(false);
      }
    });
  };

  React.useEffect(() => {
    const q = query(
      collection(db, "tickets"),
      where("user_id", "==", id),
      where("type", "==", "Withdraw"),
      where("delete", "==", false),
      where("status", "==", "Waiting for process")
    );
    onSnapshot(q, (snapshots: any) => {
      const data: DocumentData[] = [];
      snapshots.forEach((doc: any) => {
        data.push(doc.data());
      });

      setWithdrawalHistory(data);
    });
  }, [id]);

  return (
    <>
      <form onSubmit={handleWithdraw}>
        <Typography
          sx={{
            fontSize: "25px",
            cursor: "default",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          출금(환전)
        </Typography>
        <FormControl sx={styles.formControl}>
          <Typography sx={styles.inputTitle}>보유캐쉬</Typography>
          <Typography sx={styles.inputValue}>
            {balance.toLocaleString("es-US")}
          </Typography>
        </FormControl>

        <FormControl sx={styles.formControl}>
          <Typography sx={styles.inputTitle}>보유포인트</Typography>
          <Typography sx={styles.inputValue}>
            {point.toLocaleString("es-US")}P [최소 전환 가능 포인트는{" "}
            {rules.point_rules.withdraw_with_condition.toLocaleString("es-US")}P
            입니다.]
          </Typography>
        </FormControl>

        <FormControl sx={styles.formControl}>
          <Typography sx={styles.inputTitle}>출금신청금액</Typography>
          <OutlinedInput
            value={amount.toLocaleString("es-US")}
            disabled
            placeholder="출금(환전) 금액"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              borderRadius: "5px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            {withdrawMoneysData.map((withdrawMoneyData) => (
              <Button
                key={withdrawMoneyData.id}
                onClick={() =>
                  setAmount((prev) => prev + withdrawMoneyData.value)
                }
                variant="contained"
                sx={{
                  bgcolor: "#ffffff80",
                  margin: "5px 5px",
                }}
              >
                {withdrawMoneyData.money}
              </Button>
            ))}

            <Button
              variant="contained"
              color="error"
              onClick={() => setAmount(0)}
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
                bgcolor: "red",
                minWidth: "10px",
              }}
            >
              <DeleteIcon sx={{ color: "white" }} />
            </Button>
          </Box>
        </FormControl>

        <FormControl sx={styles.formControl}>
          {isLoading ? (
            <Button
              variant="contained"
              sx={{ width: "50%", bgcolor: "#2283f6", color: "#fff" }}
            >
              <CircularProgress size={20} sx={{ color: "white" }} />
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              startIcon={<CheckIcon />}
              sx={{ width: "50%", bgcolor: "#2283f6", color: "#fff" }}
            >
              출금(환전) 신청
            </Button>
          )}
        </FormControl>
      </form>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "0",
          marginTop: "20px",
        }}
      >
        <TableContainer sx={{ maxHeight: 1040 }} className={classes.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "var(--color-darkblue-500)",
                      color: "#fff",
                      borderBottom: "none",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawalHistory
                ?.sort(
                  (x: IPaymentData, y: IPaymentData) =>
                    y.created_at - x.created_at
                )
                ?.map((row: IPaymentData, idx: string) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof typeof row];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              backgroundColor: "#2b3544",
                              color: "#fff",
                              borderBottom:
                                "1.6px solid var(--color-darkblue-500)",
                              borderLeft: "unset",
                              borderRight: "unset",
                            }}
                          >
                            {column.format ? column.format(value, row) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Withdraw;

const withdrawMoneysData = [
  {
    id: "wm1",
    money: "1만원",
    value: 10000,
  },
  {
    id: "wm2",
    money: "3만원",
    value: 30000,
  },
  {
    id: "wm3",
    money: "5만원",
    value: 50000,
  },
  {
    id: "wm4",
    money: "10만원",
    value: 100000,
  },
  {
    id: "wm5",
    money: "50만원",
    value: 500000,
  },
  {
    id: "wm6",
    money: "100만원",
    value: 1000000,
  },
  {
    id: "wm7",
    money: "1천만원",
    value: 10000000,
  },
  {
    id: "wm8",
    money: "5천만원",
    value: 50000000,
  },
];
