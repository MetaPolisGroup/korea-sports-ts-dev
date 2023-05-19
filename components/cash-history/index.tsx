import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { columns } from "./columns";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useAppSelector } from "@/store/hook";
import { db } from "@/helpers/db-config";
import { DocumentData } from "@firebase/firestore-types";
import { ICashHistoryData } from "./columns";

import classes from "./cash-history.module.css";

const CashHistory = () => {
  const { id: userID } = useAppSelector((state) => state.user);
  const [cashHistory, setCashHistory] = useState<DocumentData>([]);

  useEffect(() => {
    const q = query(collection(db, "users"), where("id", "==", userID));

    onSnapshot(q, (snapshots: any) => {
      const data: DocumentData[] = [];
      snapshots.forEach((doc: any) => {
        data.push(doc.data());
      });

      setCashHistory(data);
    });
  }, [userID]);

  return (
    <React.Fragment>
      <Typography>현금 내역</Typography>
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
              {cashHistory?.[0]?.cash_history
                ?.sort(
                  (x: ICashHistoryData, y: ICashHistoryData) =>
                    y.date_time - x.date_time
                )
                ?.map((row: ICashHistoryData, idx: string) => {
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
    </React.Fragment>
  );
};

export default CashHistory;
