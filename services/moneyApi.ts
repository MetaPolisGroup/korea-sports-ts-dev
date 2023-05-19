import axiosClient from "./axiosClient";

interface IValue {
    user_id: string,
    amount: number,
    type: 'Deposit' | 'Withdraw'
}

const moneyApi = {
    post(value: IValue): Promise<any> {
        let url = '/ticket/transaction/create'
        return axiosClient.post(url, { ...value });
    },
};

export default moneyApi;