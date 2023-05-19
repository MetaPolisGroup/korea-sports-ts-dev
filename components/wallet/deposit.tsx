import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import moneyApi from "@/services/moneyApi";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, FormControl, OutlinedInput } from "@mui/material";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";
import customerApi from "@/services/customerApi";
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
  input: {
    bgcolor: "#1c2532",
    color: "white",
    borderRadius: "5px",
    padding: "16px 14px",
    display: "flex",
    alignItems: "center",
  },
  inputTitle: {
    padding: "0 14px",
    fontSize: "14px",
    fontWeight: 600,
  },
  formControl: {
    width: "100%",
    padding: "0 0 24px",
  },
  depositMoneyButton: {
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
  depositButton: {
    width: "50%",
    bgcolor: "#2283f6",
    color: "#fff",
  },
};

const Deposit = () => {
  const [amount, setAmount] = React.useState(0);
  const [depositHistory, setDepositHistory] = React.useState<DocumentData>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingSendDepositTicket, setIsLoadingSendDepositTicket] =
    React.useState<boolean>(false);

  const { id, nickname, point, balance } = useAppSelector(
    (state: RootState) => state.user
  );

  const { rules } = useAppSelector((state: RootState) => state.bettingRules);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const q = query(
      collection(db, "tickets"),
      where("user_id", "==", id),
      where("type", "==", "Deposit"),
      where("delete", "==", false),
      where("status", "==", "Waiting for process")
    );
    onSnapshot(q, (snapshots: any) => {
      const data: DocumentData[] = [];
      snapshots.forEach((doc: any) => {
        data.push(doc.data());
      });

      setDepositHistory(data);
    });
  }, [id]);

  const handleDeposit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

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

    const res = moneyApi.post({
      amount,
      type: "Deposit",
      user_id: id!,
    });

    res.then((res) => {
      if (res === true) {
        dispatch(
          setShowNotificationAlert({
            status: "success",
            title: "성공",
            message: "입금 요청이 성공했습니다!",
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

  const handleDepositTicket = () => {
    setIsLoadingSendDepositTicket(true);
    const res = customerApi.createTicket({
      title: "사용자 계정에 입금 요청",
      content: "게임을 하기 위해 지갑에 입금하고 싶습니다",
      user_id: id!,
    });
    res.then((res) => {
      if (res === true) {
        dispatch(
          setShowNotificationAlert({
            status: "success",
            title: "성공",
            message: "귀하의 요청이 성공적으로 전송되었습니다",
            isShow: true,
          })
        );
        setIsLoadingSendDepositTicket(false);
      } else {
        dispatch(
          setShowNotificationAlert({
            status: "error",
            title: "에러",
            message: res.response.data.message,
            isShow: true,
          })
        );
        setIsLoadingSendDepositTicket(false);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleDeposit}>
        <Typography
          sx={{
            fontSize: "25px",
            cursor: "default",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          입금(충전)
        </Typography>

        <FormControl sx={styles.formControl}>
          <Typography sx={styles.inputTitle}>보유캐쉬</Typography>
          <Typography sx={styles.input}>
            {balance.toLocaleString("es-US")}
          </Typography>
        </FormControl>

        <FormControl sx={styles.formControl}>
          <Typography sx={styles.inputTitle}>보유포인트</Typography>
          <Typography sx={styles.input}>
            {point.toLocaleString("es-US")}P [최소 전환 가능 포인트는{" "}
            {rules.point_rules.withdraw_with_condition.toLocaleString("es-US")}P
            입니다.]
          </Typography>
        </FormControl>

        <FormControl sx={styles.formControl}>
          <Typography sx={styles.inputTitle}>입금자명</Typography>
          <Typography sx={styles.input}>{nickname}</Typography>
        </FormControl>

        <FormControl sx={styles.formControl}>
          <Typography sx={styles.inputTitle}>입금계좌정보</Typography>
          <Typography sx={styles.input}>
            입금전 고객센터로 문의 바랍니다
            {isLoadingSendDepositTicket ? (
              <Button
                variant="contained"
                sx={{ marginLeft: "10px", width: "150px", height: "35px" }}
              >
                <CircularProgress size={20} sx={{ color: "white" }} />
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<ElectricBoltIcon />}
                sx={{ marginLeft: "10px", width: "150px", height: "35px" }}
                onClick={handleDepositTicket}
              >
                빠른 계좌문의
              </Button>
            )}
          </Typography>
        </FormControl>

        <FormControl sx={styles.formControl}>
          <Typography sx={styles.inputTitle}>입금신청금액</Typography>
          <OutlinedInput
            value={amount.toLocaleString("es-US")}
            disabled
            placeholder="최소 입금 10,000원부터"
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
            {depositMoneysData.map((depositMoneyData) => (
              <Button
                key={depositMoneyData.id}
                onClick={() =>
                  setAmount((prev) => prev + depositMoneyData.value)
                }
                variant="contained"
                sx={{
                  bgcolor: "#ffffff80",
                  margin: "5px 5px",
                }}
              >
                {depositMoneyData.money}
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
              입금(충전) 신청
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
              {depositHistory
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

export default Deposit;

const depositMoneysData = [
  {
    id: "dm1",
    money: "1천원",
    value: 1000,
  },
  {
    id: "dm2",
    money: "1만원",
    value: 10000,
  },
  {
    id: "dm3",
    money: "3만원",
    value: 30000,
  },
  {
    id: "dm4",
    money: "5만원",
    value: 50000,
  },
  {
    id: "dm5",
    money: "10만원",
    value: 100000,
  },
  {
    id: "dm6",
    money: "50만원",
    value: 500000,
  },
  {
    id: "dm7",
    money: "100만원",
    value: 1000000,
  },
  {
    id: "dm8",
    money: "1천만원",
    value: 10000000,
  },
  {
    id: "dm9",
    money: "5천만원",
    value: 50000000,
  },
];
