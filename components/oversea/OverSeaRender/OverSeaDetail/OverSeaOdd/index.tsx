import React, { useState } from "react";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import FormToggle from "@/components/domestic/Leagues/FormToggle";
import { IMatchProps } from "@/repositories/data";
import Typography from "@mui/material/Typography";
import { isEmpty } from "lodash";

type TContent = {
  odds?: string;
  handicap?: string;
  id?: string;
  header?: string;
  name?: string;
  length: number;
};

interface IOVerseaDetail {
  data: any;
  dataDetail: IMatchProps;
}

interface ComponentItem extends React.FC<IOVerseaDetail> {}

const OverSeaOdd: ComponentItem = (props) => {
  const { data, dataDetail } = props;
  const [activeID, setActiveID] = useState<string>("");
  const subOdds = [];
  for (let i in data) {
    subOdds.push(data[i]);
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    data: number
  ) => {
    setValue(data);
  };

  const activeOddButtonHandler = (id: string) => {
    setActiveID(id);
  };

  return (
    <React.Fragment>
      {subOdds.map((item, idx) => (
        <Box
          key={idx}
          sx={(theme) => ({
            borderBottom: "2px solid #2b3544",
            my: 2,
          })}
        >
          <Typography sx={{ fontSize: "14px" }}>{item?.name}</Typography>
          <ToggleButtonGroup
            style={
              !isEmpty(item)
                ? isEmpty(item?.odds)
                  ? { display: "flex", gap: 5, justifyContent: "center" }
                  : {
                      display: "grid",
                      gridTemplateColumns: `repeat(auto-fit,${
                        item?.length >= 4 ? "165px" : "48%"
                      })`,
                      gap: 5,
                      justifyContent: "center",
                    }
                : { width: "99%" }
            }
            value={value}
            exclusive
            onChange={handleChange}
          >
            <FormToggle
              handle={(e) => console.log({ e })}
              listOdds={item}
              dataDetails={dataDetail}
              onActive={activeOddButtonHandler}
              activeId={activeID}
            />
          </ToggleButtonGroup>
        </Box>
      ))}
    </React.Fragment>
  );
};

export default OverSeaOdd;
