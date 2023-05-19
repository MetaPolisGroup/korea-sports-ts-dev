import axiosClient from "./axiosClient";

interface IValue {
  id: string;
  point: number;
}

const pointApi = {
  post(value: IValue): Promise<any> {
    const url = "/point/exchange";
    return axiosClient.post(url, value);
  },
};

export default pointApi;
