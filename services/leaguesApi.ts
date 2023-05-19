import axiosClient from "./axiosClient";

const leaguesApi = {
  getCountries: (): Promise<any> => {
    const url = "/match/sports/countries/leagues";
    return axiosClient.get(url);
  },
  getPopularLeagues: (): Promise<any> => {
    const url = "/match/count-match-of-league";
    return axiosClient.get(url);
  },
};

export default leaguesApi;
