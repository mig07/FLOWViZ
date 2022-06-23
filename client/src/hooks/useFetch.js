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

  const emptyResponses = ["", {}, []];

  useEffect(async () => {
    setReqState(RequestState.starting);

    try {
      setReqState(RequestState.fetching);

      const response = await fetch(url, options).then((response) =>
        response.json()
      );

      // If response comes empty, then it is considered an error
      if (!response || emptyResponses.includes(response)) {
        throw NoResourceFoundException();
      }

      // Saving response data into state
      setData(response);
    } catch (error) {
      setError(error);
      setReqState(RequestState.error);
    } finally {
      setReqState(RequestState.success);
    }
  }, [url]);
  console.log([data, reqState, error]);
  return [data, reqState, error];
}
