import { IMatchProps } from "@/repositories/data";

import React from "react";
import LiveOdd from "./LiveOdd";
import {
  onSnapshot,
  collection,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/helpers/db-config";

interface TypeLiveDetail {
  className?: string;
  detail: IMatchProps | undefined;
  id: string | undefined;
  handle?: () => void;
}

const OverSeaDetail: React.FC<TypeLiveDetail> = (props) => {
  const [oddsData, setOddsData] = React.useState<DocumentData[]>([]);

  const { id } = props;

  React.useEffect(() => {
    if (id) {
      let q = query(
        collection(db, "odds"),
        where("FI", "==", id),
        where("type", "==", "inplay-match")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setOddsData(data);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [id]);

  return (
    <React.Fragment>
      {oddsData.map((item, idx) => {
        var newObject = { ...item.main.sp };
        delete newObject.fulltime;
        return (
          <div style={{ height: "814px", overflowY: "scroll" }} key={idx}>
            <LiveOdd
              handle={() => {}}
              dataDetail={props.detail}
              data={newObject}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default OverSeaDetail;
