import { PAGE_SIZE } from "@/constants";
import { db } from "@/helpers/db-config";
import { WhereFilterOp } from "@firebase/firestore-types";
import {
  collection,
  limit,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { DocumentData } from "@firebase/firestore-types";

const now = new Date();

const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
const nowTimestamp = Math.floor(now.getTime() / 1000);
const threeDaysAgoTimestamp = Math.floor(threeDaysAgo.getTime() / 1000);

export interface IQueryPara {
  nameCollection: string;
  field: string;
  operator: WhereFilterOp;
  conditional: string | number | boolean;
  anotherField: string;
  anotherOperator: WhereFilterOp;
  anotherConditional: string | number | boolean;
  isLimit: boolean;
}

export const queryBuilderFunc = async (
  nameCollection: string,
  field: string,
  operator: WhereFilterOp,
  conditional: string | number | boolean
) => {
  let q;
  if (nameCollection === "odds") {
    q = query(
      collection(db, nameCollection),
      where(field, operator, conditional)
    );
  } else {
    q = query(
      collection(db, nameCollection),
      where(field, operator, conditional)
    );
  }

  const querySnapshot = await getDocs(q);
  const data: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });
  return data;
};

export const queryMultiplyBuilderFunc = ({
  nameCollection,
  field,
  operator,
  conditional,
  anotherField,
  anotherOperator,
  anotherConditional,
  isLimit = false,
}: IQueryPara) => {
  if (isLimit) {
    const q = query(
      collection(db, nameCollection),
      where(field, operator, conditional),
      where(anotherField, anotherOperator, anotherConditional),
      limit(PAGE_SIZE)
    );
    return q;
  }
  const q = query(
    collection(db, nameCollection),
    where(field, operator, conditional),
    where(anotherField, anotherOperator, anotherConditional)
  );
  return q;
};
