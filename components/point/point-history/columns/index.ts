import dayjs from "dayjs";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: any, data: IPointHistoryData) => string;
}

export interface IPointHistoryData {
  after_point: number;
  before_point: number;
  date_time: number;
  division: string;
  transaction_point: number;
}

export const columns: readonly Column[] = [
  {
    id: "date_time",
    label: "날짜",
    minWidth: 170,
    format: (value: number) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: "division",
    label: "현금 거래 내역",
    minWidth: 100,
    format: (value: string) => {
      return value;
    },
  },
  {
    id: "before_point",
    label: "포인트 전",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "transaction_point",
    label: "트랜잭션 포인트",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "after_point",
    label: "포인트 후",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];
