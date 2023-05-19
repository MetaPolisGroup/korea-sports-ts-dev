import { db } from "@/helpers/db-config";
import {
  onSnapshot,
  collection,
  DocumentData,
  query,
  limit,
  where,
  startAfter,
  orderBy,
  getDocs,
} from "firebase/firestore";
// import { useFirestoreCollectionData } from "reactfire";
import { PAGE_SIZE } from "@/constants";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  WhereFilterOp,
} from "@firebase/firestore-types";
import { CloseFullscreen, DoDisturbAlt } from "@mui/icons-material";
import { refFromURL } from "firebase/database";
import { isEmpty } from "lodash";

export enum EStatus {
  OFF = 0,
  ACTIVE,
}
const now = new Date();
const threeDaysAhead = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // milliseconds
const nowTimestamp = Math.floor(now.getTime() / 1000); // seconds
const threeDaysAheadTimestamp = Math.floor(threeDaysAhead.getTime() / 1000); // seconds

export const getDataCollectionSnapshort = async (
  collectionName: string,
  callback?: (data: any) => void
) => {
  const collectionRef = collection(db, collectionName);

  onSnapshot(collectionRef, (snapshots) => {
    const data: DocumentData[] = [];
    snapshots.forEach((doc) => {
      data.push(doc.data());
    });
    if (typeof callback === "function")
      callback({
        data,
      });
  });
};

export const loadFirstPageSnapshort = async (
  collectionName: string,
  sportValue: string | number,
  status: EStatus,
  callback: (data: any) => void
) => {
  const collectionRef = collection(db, collectionName);
  let q: any;
  if (sportValue !== "all") {
    q = query(
      collectionRef,
      where("sport_id", "==", sportValue),
      where("time_status", "==", status.toString())
      // where("main_odd", "==", true)
    );
  } else {
    q = query(
      collectionRef,
      where("time_status", "==", status.toString())
      // where("main_odd", "==", true)
    );
  }

  onSnapshot(q, (querySnapshot: any) => {
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const data: DocumentData[] = [];
    querySnapshot.forEach((doc: DocumentData) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    if (typeof callback === "function")
      callback({
        data,
        lastVisible,
        firstVisible: querySnapshot.docs[0],
      });
  });
};

export const loadNextPageSnapshot = (
  collectionName: string,
  sportValue: string | number,
  lastVisible: QueryDocumentSnapshot<DocumentData>,
  status: EStatus,
  callback: (data: any) => void
) => {
  const collectionRef = collection(db, collectionName);
  let q: any;
  console.log(sportValue);
  if (sportValue !== "all") {
    q = query(
      collectionRef,

      where("time_status", "==", status.toString()),
      // where("main_odd", "==", true),
      orderBy("time"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      collectionRef,
      where("sport_id", "==", sportValue),
      where("time_status", "==", status.toString()),
      // where("main_odd", "==", true),
      orderBy("time"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );
  }

  onSnapshot(q, (querySnapshot: any) => {
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const data: DocumentData[] = [];
    querySnapshot.forEach((doc: DocumentData) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    if (typeof callback === "function")
      callback({
        data,
        lastVisible,
        firstVisible: querySnapshot.docs[0],
      });
  });
};

export const checkOddMatch = async (
  idFI: string,
  callback: (isOdds: any) => void
) => {
  const q = query(collection(db, "odds"), where("FI", "==", idFI));
  onSnapshot(q, (querySnapshot: any) => {
    const isOdds: any = [];

    querySnapshot.forEach((doc: DocumentData) => {
      // doc.data() is never undefined for query doc snapshots

      isOdds.push({
        id: doc.data().FI,
        isOdd: isEmpty(doc.data().main.sp),
      });
    });

    console.log(isOdds);
    if (typeof callback === "function")
      callback({
        isOdds,
      });
  });
};
