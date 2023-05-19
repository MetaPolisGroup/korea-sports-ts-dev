import axiosClient from "./axiosClient";

export interface IRequest {
  subCode: string | undefined;
  id: string | undefined;
  nickname: string | undefined;
  phone: string | undefined;
  password: string | undefined;
  bankName: string;
  bankAccountNumber: string | undefined;
  bankAccountHolder: string | undefined;
  recommendId: string;
}

const authApi = {
  login(value: { id: string; password: string }): Promise<{ token: string }> {
    const url = "/user/login";
    return axiosClient.post(url, value);
  },
  register(value: IRequest): Promise<{ token: string } | any> {
    const url = "/user/register";
    return axiosClient.post(url, { ...value });
  },
  pay(id: string): Promise<boolean> {
    const url = "/bet/pay/" + id;
    return axiosClient.get(url);
  },
  confirmCode(subCode: { subCode: string | undefined }): Promise<any> {
    const url = "user/check-subscription-code";
    return axiosClient.post(url, { ...subCode });
  },
  logout() {
    const url = "/user/signout";
    return axiosClient.post(url);
  },
};

export default authApi;
