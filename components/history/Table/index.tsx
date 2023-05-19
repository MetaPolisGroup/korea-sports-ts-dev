import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import css from "./index.module.css";
import Header from "../Header";
import Footer from "../Footer";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import { IResponseData } from "@/pages/history";
import { KeyedMutator } from "swr/_internal";
import { DateConverter } from "@/helpers/date-converter";
import { TransitionGroup } from "react-transition-group";
import axiosClient from "@/services/axiosClient";
import { DocumentData } from "@firebase/firestore-types";
import { RootState } from "@/store";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";
import dayjs from "dayjs";

interface ITableProps {
  data: DocumentData;
}

const CustomizedTables: React.FC<ITableProps> = (props) => {
  const { data } = props;

  const { id } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleDeleteAll = () => {
    const url = `/bet/deleteAll/${id}`;
    axiosClient
      .post(url)
      .then(() => {
        dispatch(
          setShowNotificationAlert({
            status: "success",
            title: "성공",
            message: "모든 성공한 베팅 내역이 삭제되었습니다!",
            isShow: true,
          })
        );
      })
      .catch(() => {
        dispatch(
          setShowNotificationAlert({
            status: "error",
            title: "에러",
            message: "모든 실패한 베팅 내역이 삭제되었습니다!",
            isShow: true,
          })
        );
      });
  };

  return (
    <React.Fragment>
      <Header actionRemove={handleDeleteAll} />
      <TransitionGroup
        style={{ height: 1040, overflowY: "scroll" }}
        className="scroll-area"
        component="div"
      >
        {data &&
          data.map((item: any) => {
            const row = item.betting.map((i: any) => {
              return createData(
                i.league,
                item.amount,
                i.home_team,
                i.away_team,
                i.odd_type,
                i.odd.team,
                i.odd.odds,
                i.score,
                item.bonus,
                i.match_status,
                dayjs(i.time * 1000).format("YYYY-MM-DD HH:mm"),
                i.bet_result
              );
            });

            return (
              <Collapse style={{ margin: "30px 0" }} key={item.id}>
                <RenderData rows={row} />
                <Footer
                  data={item}
                  removeItem={(id) => {
                    const url = `/bet/delete/${id}`;
                    axiosClient.post(url);
                    const updatedData = data.filter(
                      (item: any) => item.id !== id
                    );
                  }}
                />
              </Collapse>
            );
          })}
      </TransitionGroup>
    </React.Fragment>
  );
};

export default CustomizedTables;

const RenderData: React.FC<{ rows: IRows[] }> = (props) => {
  const { rows } = props;

  return (
    <TableContainer className={css["wrapper-table"]}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">시간</StyledTableCell>
            <StyledTableCell>리그 이름</StyledTableCell>
            <StyledTableCell align="center">금액</StyledTableCell>
            <StyledTableCell align="center" style={{ padding: 8, width: 250 }}>
              홈팀과 원
            </StyledTableCell>
            <StyledTableCell align="center" style={{ padding: 8 }}>
              게임 유형
            </StyledTableCell>
            <StyledTableCell align="center" style={{ padding: 8 }}>
              베팅
            </StyledTableCell>
            <StyledTableCell align="center" style={{ padding: 8 }}>
              배당률
            </StyledTableCell>
            <StyledTableCell align="center" style={{ padding: 8 }}>
              점수
            </StyledTableCell>

            <StyledTableCell align="center">상태</StyledTableCell>
            <StyledTableCell align="center">결과</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell align="center" width={150}>
                {row.time}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.amount.toLocaleString("es-US")}
              </StyledTableCell>
              <StyledTableCell align="left">
                <RenderBetting
                  home_team={row.home_team}
                  away_team={row.away_team}
                />
              </StyledTableCell>
              <StyledTableCell align="center">{row.odd_type}</StyledTableCell>{" "}
              <StyledTableCell align="center">{row.team}</StyledTableCell>{" "}
              <StyledTableCell align="center">{row.odds}</StyledTableCell>{" "}
              <StyledTableCell align="center">{row.score}</StyledTableCell>
              <StyledTableCell align="center">
                {row.match_status === "3" ? "Ended" : "Not Started"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <span
                  style={{
                    fontWeight: "bold",
                    borderRadius: 5,
                    backgroundColor:
                      row.result === "win"
                        ? "var(--color-blue)"
                        : row.result === "lost"
                        ? "var(--color-lightRed)"
                        : "#777362",
                    padding: 5,
                  }}
                >
                  {row.result}
                </span>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const RenderBetting: React.FC<{ home_team: string; away_team: string }> = (
  props
) => {
  const { away_team, home_team } = props;
  return (
    <React.Fragment>
      <div style={{ padding: 8 }}>
        <span style={{ color: "yellow" }}>Home Team:</span>
        <span> {home_team}</span>
      </div>
      <div style={{ padding: 8 }}>
        <span style={{ color: "blue" }}>Original Team:</span>
        <span> {away_team}</span>
      </div>
    </React.Fragment>
  );
};

function createData(
  name: string,
  amount: number,
  home_team: string,
  away_team: string,
  odd_type: string,
  team: string,
  odds: string,
  score: string,
  bonus: number,
  match_status: string,
  time: string,
  result: string
) {
  return {
    name,
    amount,
    home_team,
    away_team,
    odd_type,
    team,
    odds,
    score,
    bonus,
    match_status,
    time,
    result,
  };
}

interface IRows {
  name: string;
  amount: number;
  home_team: string;
  away_team: string;
  odd_type: string;
  team: string;
  odds: string;
  score: string;
  bonus: number;
  match_status: string;
  time: string;
  result: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#19212B",
    color: theme.palette.common.white,
    borderRight: "1px solid #19212B",
    borderBottom: "unset",
  },
  [`&.${tableCellClasses.head}:last-child`]: {
    borderRight: "unset",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#2b3544",
    color: theme.palette.common.white,
  },
  [`& tr:last-child td `]: {
    borderBottom: "undet",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&>td, &>th": {
    borderRight: "1.6px solid #19212B",
    borderTop: "unset",
    borderBottom: "1.6px solid #19212B",
  },
  "&>td:last-child, &>th:last-child": {
    borderRight: "unset",
  },
}));
