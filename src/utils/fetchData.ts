import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import RequestMethod from "../enums/RequestMethod";

const fetchData = async <IData>({
  method = RequestMethod.GET,
  endpoint,
  setData,
  setIsLoading,
  paramsList,
  queryList,
  body,
}: {
  method?: RequestMethod;
  endpoint: string;
  setData?: Dispatch<SetStateAction<IData>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  paramsList?: Array<string>;
  queryList?: Array<{ queryName: string; queryValue: string }>;
  body?: object;
}): Promise<IData> => {
  let url = import.meta.env.VITE_VINTED_API_URL + endpoint;
  paramsList &&
    paramsList.forEach((params) => {
      url += "/" + params;
    });
  queryList &&
    queryList.forEach((query, index) => {
      if (index === 0) {
        url += "?";
      } else {
        url += "&";
      }
      url += query.queryName + "=" + query.queryValue;
    });
  let response;
  switch (method) {
    case RequestMethod.GET:
      response = await axios.get(url, body);
      break;
    case RequestMethod.POST:
      response = await axios.post(url, body);
      break;
    case RequestMethod.DELETE:
      response = await axios.delete(url, body);
      break;
    case RequestMethod.PATCH:
      response = await axios.patch(url, body);
      break;
    case RequestMethod.PUT:
      response = await axios.put(url, body);
  }
  setData && setData(response.data);
  setIsLoading && setIsLoading(false);
  return response.data;
};

export default fetchData;
