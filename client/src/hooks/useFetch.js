import { useState, useEffect } from "react";
import NoResourceFoundException from "../exception/NoResourceFoundException";

export const RequestState = {
  starting: "starting",
  fetching: "fetching",
  error: "error",
  success: "success",
};

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [reqState, setReqState] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setReqState(RequestState.starting);

    try {
      setReqState(RequestState.fetching);

      const response = await fetch(url, options).then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      });

      // Saving response data into state
      setData(response);
    } catch (error) {
      setError(error);
      setReqState(RequestState.error);
    } finally {
      setReqState(RequestState.success);
    }
  }, [url]);
  return [data, reqState, error];
}
