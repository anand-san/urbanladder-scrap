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
      url: "a3cd6d70-e4e9-493d-9764-2998f9dd5cde",
      data: {},
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw (error);
      });
  };