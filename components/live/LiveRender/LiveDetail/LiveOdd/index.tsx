import React from "react";
import { ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import FormToggle from "@/components/domestic/Leagues/FormToggle";
import { IMatchProps } from "@/repositories/data";
import { DocumentData } from "@firebase/firestore-types";
import Typography from "@mui/material/Typography";
import { isEmpty } from "lodash";
import { getKeyByValue } from "@/helpers/get-keyObject";

type TContent = {
  id: number;
  name: string;
  valueOdd: string;
  logo: string;
  length: number;
};

interface ILiveDetail {
  data: any;
  dataDetail: IMatchProps | undefined;
  handle: () => void;
  listOdds?: DocumentData[];
}

interface ComponentItem extends React.FC<ILiveDetail> {}

const LiveOdd: ComponentItem = (props) => {
  const { data, dataDetail } = props;
  const [value, setValue] = React.useState(0);
  const [activeID, setActiveID] = React.useState<string>("");
  const handleChange = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    data: number
  ) => {
    setValue(data);
  };

  const activeOddButtonHandler = (id: string) => {
    setActiveID(id);
  };
  let subOdds: any = [];
  if (dataDetail?.sport_id === "1") {
    subOdds = [
      data[getKeyByValue(data, "1777")],
      data[getKeyByValue(data, "12")],
      data[getKeyByValue(data, "15")],
      data[getKeyByValue(data, "441")],
      data[getKeyByValue(data, "10161")],
      data[getKeyByValue(data, "3")],
      data[getKeyByValue(data, "4")],
      data[getKeyByValue(data, "5")],
      data[getKeyByValue(data, "6")],
      data[getKeyByValue(data, "442")],
      data[getKeyByValue(data, "50187")],
      data[getKeyByValue(data, "18")],
      data[getKeyByValue(data, "421")],
      data[getKeyByValue(data, "16")],
      data[getKeyByValue(data, "17")],
      data[getKeyByValue(data, "50391")],
      data[getKeyByValue(data, "50390")],
      data[getKeyByValue(data, "10565")],
    ];
  }

  if (dataDetail?.sport_id === "18") {
    subOdds = [
      data[getKeyByValue(data, "938")],
      data[getKeyByValue(data, "17")],
      data[getKeyByValue(data, "40")],
      data[getKeyByValue(data, "113")],
      data[getKeyByValue(data, "528")],
      data[getKeyByValue(data, "180058")],
      data[getKeyByValue(data, "610")],
      data[getKeyByValue(data, "591")],
    ];
  }

  if (dataDetail?.sport_id === "16") {
    subOdds = [
      data[getKeyByValue(data, "938")],
      data[getKeyByValue(data, "17")],
      data[getKeyByValue(data, "40")],
      data[getKeyByValue(data, "817")],
      data[getKeyByValue(data, "818")],
      data[getKeyByValue(data, "130477")],
      data[getKeyByValue(data, "90")],
      data[getKeyByValue(data, "130474")],
      data[getKeyByValue(data, "130475")],
      data[getKeyByValue(data, "87")],
      data[getKeyByValue(data, "923")],
      data[getKeyByValue(data, "160036")],
    ];
  }

  if (dataDetail?.sport_id === "91") {
    subOdds = [
      data[getKeyByValue(data, "938")],
      data[getKeyByValue(data, "17")],
      data[getKeyByValue(data, "40")],
      data[getKeyByValue(data, "910103")],
      data[getKeyByValue(data, "910102")],
      data[getKeyByValue(data, "910096")],
      data[getKeyByValue(data, "910094")],
      data[getKeyByValue(data, "910093")],
    ];
  }

  if (dataDetail?.sport_id === "17") {
    subOdds = [
      data[getKeyByValue(data, "938")],
      data[getKeyByValue(data, "17")],
      data[getKeyByValue(data, "40")],
      data[getKeyByValue(data, "170114")],
      data[getKeyByValue(data, "432")],
      data[getKeyByValue(data, "443")],
      data[getKeyByValue(data, "94")],
      data[getKeyByValue(data, "170115")],
    ];
  }
  return (
    <React.Fragment>
      {subOdds?.map((item: any, idx: any) => (
        <Box
          key={idx}
          sx={(theme) => ({
            borderBottom: "2px solid #2b3544",
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
                : { width: "100%" }
            }
            value={value}
            exclusive
            onChange={handleChange}
          >
            <FormToggle
              handle={(e) => console.log(e)}
              listOdds={item}
              dataDetails={dataDetail!}
              onActive={activeOddButtonHandler}
              activeId={activeID}
            />
          </ToggleButtonGroup>
        </Box>
      ))}
    </React.Fragment>
  );
};

export default LiveOdd;
