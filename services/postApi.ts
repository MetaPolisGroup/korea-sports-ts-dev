import axiosClient from "./axiosClient";

// export const postDataByAxios = async (url: string, dataInput: any) => {
//   const response = await axios.post(Params.baseURL + url, dataInput, {
//     headers: Params.headers,
//   });
//   return response;
// };

interface IValue {
  id: string,
  matchId: string,
  oddType: string,
  odds: string
}

interface IRequest {
  amount: number,
  betting: IValue[],
  userId: string
}

interface IResponse {
  amount: number
  winningAmount: number
}

const postDataByAxios = {
  post(url: string, value: IRequest[]): Promise<IResponse> {
    return axiosClient.post(url, value);
  },
};

export default postDataByAxios;