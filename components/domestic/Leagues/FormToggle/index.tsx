import React, { Fragment } from "react";

import Odd from "@/components/odd";
import AddIcon from "@mui/icons-material/Add";
import { DocumentData } from "@firebase/firestore-types";
import Box from "@mui/material/Box";
import { IMatchProps } from "@/repositories/data";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { setBetSlip } from "@/store/slices/betSlipSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";
import classes from "./FormToggle.module.css";

interface IOddData {
  id: string;
  name: string;
  odds: string;
  header?: string;
  team?: string;
}

interface IFormToggle {
  listOdds: DocumentData;
  handle?: (value: number, isCheck: boolean) => void;
  dataDetails: IMatchProps;
  onActive: (id: string) => void;
  activeId: string;
}

const FormToggle = (props: IFormToggle) => {
  const { listOdds, dataDetails, onActive, activeId } = props;
  const { betsData } = useAppSelector((state: RootState) => state.betSlip);
  const dispatch = useAppDispatch();

  const handleActive = (id: string) => {
    onActive(id);
  };

  const handleSetBetSlip = (data: any) => {
    dispatch(setBetSlip(data));
  };

  return (
    <Fragment>
      {!isEmpty(listOdds?.odds) ? (
        listOdds?.odds?.map((odd: IOddData) => (
          <Odd
            key={odd.id}
            onClick={(e: any) => {
              handleSetBetSlip({
                odd: odd,
                ...dataDetails,
                odd_types: listOdds.name,
              });
              handleActive(odd.id);
              e.preventDefault();
              e.stopPropagation();
            }}
            typeButton="Button"
            value={odd.odds}
            style={
              activeId === odd.id &&
              betsData.some((betData) => betData.odd.id === activeId)
                ? { backgroundColor: "#2283f6;" }
                : undefined
            }
          >
            <Tooltip title={odd.team} placement="top">
              <span className={classes.btnTooltop}>
                <span className={classes.team}>{odd.team}</span>
              </span>
            </Tooltip>
            <span className={classes.odds}>{odd.odds}</span>
          </Odd>
        ))
      ) : (
        // <Box sx={{ width: "100%" }}>
        //   <Typography variant="subtitle2" sx={{ mt: 1 }}>
        //     {listOdds.name}
        //   </Typography>
        //   <Stack direction="row" spacing={2} style={{ width: "100%" }}></Stack>
        // </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "5px",
            padding: "0 1.5%",
          }}
        >
          <Odd typeButton="Button" className={classes.btnRemove}>
            <RemoveIcon />
          </Odd>
          <Odd typeButton="Button" className={classes.btnRemove}>
            <RemoveIcon />
          </Odd>
          <Odd typeButton="Button" className={classes.btnRemove}>
            <RemoveIcon />
          </Odd>
        </Box>
      )}
    </Fragment>
  );
};

export default FormToggle;
