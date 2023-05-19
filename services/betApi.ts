import axiosClient from "./axiosClient";

interface ICancelBet {
  betslipId: string;
  userId: string;
}

interface IConfirmBet {
  userId: string;
  amount: number;
  betting: { matchId: string; oddType: string; id: string; odds: number }[];
}

const betApi = {
  confirmBet(value: IConfirmBet): Promise<any> {
    const url = "/bet/confirm";
    return axiosClient.post(url, { ...value });
  },

  bet(value: IConfirmBet): Promise<any> {
    const url = "/bet";
    return axiosClient.post(url, { ...value });
  },

  cancelBet(value: ICancelBet): Promise<any> {
    const url = "/bet/cancel";
    return axiosClient.put(url, { ...value });
  },
};

export default betApi;
