import React from "react";
import Live from "@/components/live";
import Layout from "@/components/layout/layout";
import CircularProgress from "@mui/material/CircularProgress";
import { NextPage } from "next/types";
import type { IMatchProps } from "@/repositories/data";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { getDataCollectionSnapshort } from "@/lib/snapshort-func";
import { setBettingRules } from "@/store/slices/bettingRulesSlice";
import { addCountries } from "@/store/slices/countries";
import { addLeagues } from "@/store/slices/countries";
import { addTeams } from "@/store/slices/countries";
import { db } from "@/helpers/db-config";
import { EStatus } from "@/lib/get-func";

import {
  onSnapshot,
  collection,
  DocumentData,
  query,
  where,
} from "firebase/firestore";

interface IDataProps {
  data: { data: IMatchProps[]; totalData: number; lastVisible: string };
}

const LivePage: NextPage<IDataProps> = () => {
  const { category } = useAppSelector((state) => state.categorySlice);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [datas, setDatas] = React.useState<DocumentData>([]);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getDataCollectionSnapshort("preferences", (data) =>
      dispatch(setBettingRules({ rules: data.data[0] }))
    );

    getDataCollectionSnapshort("countries", (data) => {
      dispatch(addCountries(data.data));
    });

    getDataCollectionSnapshort("leagues", (data) => {
      dispatch(addLeagues(data.data));
    });

    getDataCollectionSnapshort("team", (data) => {
      dispatch(addTeams(data.data));
    });

    let q: any;
    if (category.id) {
      setIsLoading(true);
      if (category.id.toString() !== "all") {
        q = query(
          collection(db, "matches"),
          where("sport_id", "==", category.id),
          where("time_status", "==", EStatus.ACTIVE.toString())
          // where("main_odd", "==", true)
        );
      } else {
        q = query(
          collection(db, "matches"),
          where("time_status", "==", EStatus.ACTIVE.toString())
          // where("main_odd", "==", true)
        );
      }
    }

    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const data: DocumentData[] = [];
      querySnapshot.forEach((doc: any) => {
        data.push(doc.data());
      });
      setDatas(data);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [category.id]);

  return (
    <Layout title="Live" description="Generated by create next app">
      {isLoading ? (
        <div>
          <CircularProgress style={{ display: "flex", margin: "0 auto" }} />
        </div>
      ) : (
        <Live datas={datas} />
      )}
    </Layout>
  );
};

export default LivePage;
