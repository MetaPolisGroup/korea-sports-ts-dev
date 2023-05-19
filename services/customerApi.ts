import axiosClient from "./axiosClient";

interface ICustomerApi {
  user_id: string;
  title: string;
  content: string;
}

interface IReply {
  ticket_id: string;
  user_id: string;
  content: string;
}

const customerApi = {
  createTicket(value: ICustomerApi): Promise<any> {
    let url = "/ticket/solo/create";
    return axiosClient.post(url, { ...value });
  },
  replyTicket(value: IReply): Promise<any> {
    let url = "/ticket/solo/response";
    return axiosClient.put(url, { ...value });
  },
};

export default customerApi;
