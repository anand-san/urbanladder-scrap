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
      url: "ebb080ec-6afc-42f3-a69a-1f6ab954cdec",
      data: {},
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw (error);
      });
  };