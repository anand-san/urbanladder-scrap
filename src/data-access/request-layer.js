import axios from "axios";

const AXIOS_TIMEOUT = 60000;

var api = axios.create({
    baseURL: "https://run.mocky.io/v3/",
  timeout: AXIOS_TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

export const FetchData = () => {
    return api({
      method: "post",
      headers: "",
      url: "2f721130-6c45-4937-aa1f-2e60d91db130",
      data: {},
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw (error);
      });
  };