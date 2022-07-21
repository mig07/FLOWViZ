import { useState, useEffect } from "react";

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

      const response = await fetch(url, options);
      const res = await response.json();

      if (!response.ok) {
        setError(res);
        setReqState(RequestState.error);
        return;
      }

      // Saving response data into state
      setData(res);
      setReqState(RequestState.success);
    } catch (error) {
      setError(error);
      setReqState(RequestState.error);
    }
  }, [url]);
  return [data, reqState, error];
}
