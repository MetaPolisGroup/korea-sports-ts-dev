import dayjs from "dayjs";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any, data: IPaymentData) => string;
}

export interface IPaymentData {
  created_at: number;
  amount: number;
  point: number;
  status: string;
  type: string;
}

export const columns: readonly Column[] = [
  {
    id: "created_at",
    label: "날짜 시간",
    minWidth: 40,
    format: (value: number) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: "type",
    label: "유형",
    minWidth: 170,
    format: (value: string) => value,
  },
  {
    id: "amount",
    label: "양",
    minWidth: 100,
    format: (value: number) => {
      return value.toLocaleString("es-US");
    },
  },
  {
    id: "point",
    label: "가리키다",
    minWidth: 170,
    format: (value: number) => value.toLocaleString("en-US"),
  },

  {
    id: "status",
    label: "상태",
    minWidth: 170,
    format: (value: string) => value,
  },
];
