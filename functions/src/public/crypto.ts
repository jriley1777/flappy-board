import axios from "axios";
import qs from "qs";

const apiRoot = "https://min-api.cryptocompare.com/data/price?";

export const getCryptoPrice = async (coinTicker: string) => {
  let params = {
    fsym: coinTicker,
    tsyms: "USD",
  };
  const response = await axios
    .get(`${apiRoot}${qs.stringify(params)}`)
    .then(({ data }: any) => {
      return `${coinTicker}: ${data.USD}`;
    })
    .catch((error) => error);
  return response;
};