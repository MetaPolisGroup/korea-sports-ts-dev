import { queryBuilderFunc } from "@/lib/query-func";
import { IMatchProps } from "@/repositories/data";
import { DocumentData } from "@firebase/firestore-types";
import React from "react";
import OverSeaOdd from "./OverSeaOdd";

interface TypeLiveDetail {
  className?: string;
  dataDetails: IMatchProps;
}

const OverSeaDetail: React.FC<TypeLiveDetail> = (props) => {
  const [oddsData, setOddsData] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    if (props.dataDetails.id)
      queryBuilderFunc("odds", "FI", "==", props.dataDetails.id).then((i) =>
        setOddsData(i)
      );
  }, [props.dataDetails.id]);

  return (
    <React.Fragment>
      <div style={{ height: "815px", overflowY: "scroll" }}>
        {oddsData.map((item, idx) => {
          var newObject = { ...item.main.sp };
          delete newObject.fulltime;
          return (
            <OverSeaOdd
              key={idx}
              dataDetail={props.dataDetails}
              data={newObject}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default OverSeaDetail;
