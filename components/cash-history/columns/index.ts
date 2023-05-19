import dayjs from "dayjs";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any, data: ICashHistoryData) => string;
}

export interface ICashHistoryData {
  after_amount: number;
  before_amount: number;
  date_time: number;
  division: string;
  note: string;
  transaction_amount: number;
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
    format: (value: string, data) => {
      return `[${value}] ${data.note}`;
    },
  },
  {
    id: "before_amount",
    label: "거래 전 금액",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "transaction_amount",
    label: "거래 금액",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "after_amount",
    label: "거래 후 금액",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];
