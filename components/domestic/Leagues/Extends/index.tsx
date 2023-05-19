import React from "react";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import FormToggle from "../FormToggle";
import Odd from "@/components/odd";
import { DocumentData } from "@firebase/firestore-types";
import { IMatchProps } from "@/repositories/data";
import { isEmpty } from "lodash";

interface IExtends {
  open: boolean;
  listOdds: DocumentData;
  dataDetails: IMatchProps;
  onActive: (id: string) => void;
  activeId: string;
}
const Extends: React.FC<IExtends> = ({
  open,
  listOdds,
  dataDetails,
  onActive,
  activeId,
}) => {
  const subOdds = [
    listOdds?.main?.sp.asian_handicap,
    listOdds?.main?.sp.goals_over_under,
  ];

  return (
    <Collapse in={open}>
      <List component="div" disablePadding>
        <Stack spacing={0.5} direction="column">
          {!isEmpty(subOdds) &&
            subOdds.map((item, idx) => (
              <Box display="flex" gap={1} key={idx}>
                <FormToggle
                  handle={(e) => console.log(e)}
                  listOdds={item}
                  dataDetails={dataDetails}
                  onActive={onActive}
                  activeId={activeId}
                />
                <Odd
                  typeButton="Button"
                  style={{ minWidth: 30, width: 30 }}
                  disabled
                />
              </Box>
            ))}
        </Stack>
      </List>
    </Collapse>
  );
};

export default Extends;
