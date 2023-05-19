import { db } from "@/helpers/db-config";
import {
  onSnapshot,
  collection,
  DocumentData,
  query,
  limit,
  getDocs,
  where,
  getCountFromServer,
  startAfter,
  orderBy,
} from "firebase/firestore";
// import { useFirestoreCollectionData } from "reactfire";
import { PAGE_SIZE } from "@/constants";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { checkOddMatch } from "./snapshort-func";

export enum EStatus {
  OFF = 0,
  ACTIVE,
}
const now = new Date();
const threeDaysAhead = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // milliseconds
const nowTimestamp = Math.floor(now.getTime() / 1000); // seconds
const threeDaysAheadTimestamp = Math.floor(threeDaysAhead.getTime() / 1000); // seconds
const end = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  23,
  59,
  59,
  999
).getTime();

export const getDataCollection = async (collectionName: string) => {
  const q = collection(db, collectionName);
  const data: DocumentData[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const loadFirstPage = async (
  collectionName: string,
  sportValue: string | number,
  status: EStatus
) => {
  const collectionRef = collection(db, collectionName);
  let q;

  if (
    (collectionName === "matches" || collectionName === "bets") &&
    sportValue !== "all"
  ) {
    q = query(
      collectionRef,
      where("sport_id", "==", sportValue),
      where("time_status", "==", status.toString()),
      where("time", ">=", nowTimestamp.toString()),
      // where("time", "<=", end.toString()),
      where("main_odd", "==", true),
      orderBy("time", "asc")
      // limit(PAGE_SIZE)
    );
  } else if (
    (collectionName === "matches" || collectionName === "bets") &&
    sportValue === "all"
  ) {
    q = query(
      collectionRef,
      where("time_status", "==", status.toString()),
      // where("time", ">=", nowTimestamp.toString()),
      // where("time", "<=", threeDaysAheadTimestamp.toString()),
      where("main_odd", "==", true),
      orderBy("time", "asc")
      // limit(PAGE_SIZE)
    );
  } else {
    q = query(
      collectionRef,
      where("sport_id", "==", sportValue),
      where("time_status", "==", status.toString()),
      orderBy("time", "asc"),
      limit(PAGE_SIZE)
    );
  }

  const snapshots = await getCountFromServer(
    query(collectionRef, where("sport_id", "==", sportValue))
  );

  if (!q) return;

  const querySnapshot = await getDocs(q);
  const data: DocumentData[] = [];

  querySnapshot.forEach((doc) => {
    // const qOdds = query(
    //   collection(db, "odd"),
    //   where("FI", "==", doc.data().id)
    // );

    // onSnapshot(qOdds, (querySnapshotOdd) => {
    //   querySnapshotOdd.forEach((docOdd) => {
    //     console.log(docOdd.data());
    //   });
    // });c
    // console.log(await checkOddMatch(doc.data().id));

    data.push(doc.data());
  });

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  // get total soccer matches
  return {
    data,
    totalData: snapshots.data().count,
    lastVisible: JSON.stringify(lastVisible),
  };
};

export const loadNextPage = async (
  collectionName: string,
  sportValue: string | number,
  lastVisible: QueryDocumentSnapshot<DocumentData>,
  status: EStatus
) => {
  const collectionRef = collection(db, collectionName);
  let q;

  if (
    (collectionName === "matches" || collectionName === "bets") &&
    sportValue !== "all"
  ) {
    q = query(
      collectionRef,
      where("sport_id", "==", sportValue),
      where("time_status", "==", status.toString()),
      where("time", ">=", nowTimestamp.toString()),
      where("time", "<=", threeDaysAheadTimestamp.toString()),
      where("main_odd", "==", true),
      limit(PAGE_SIZE),
      orderBy("time", "desc"),
      startAfter(lastVisible)
    );
  } else if (
    (collectionName === "matches" || collectionName === "bets") &&
    sportValue === "all"
  ) {
    q = query(
      collectionRef,
      where("time_status", "==", status.toString()),
      // where("time", ">=", nowTimestamp.toString()),
      // where("time", "<=", threeDaysAheadTimestamp.toString()),
      where("main_odd", "==", true),
      orderBy("time", "desc"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      collectionRef,
      where("sport_id", "==", sportValue),
      where("time_status", "==", status.toString()),
      startAfter(lastVisible),
      orderBy("time"),
      limit(PAGE_SIZE)
    );
  }

  const querySnapshot = await getDocs(q);
  const data: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
    data,
    lastVisible: newLastVisible,
    firstVisible: querySnapshot.docs[0],
  };
};
