import { useState, useEffect } from "react";

export const RequestState = {
  fetching: "fetching",
  error: "error",
  success: "success",
};

export default function useFetch(url, options, requestNow = false) {
  const [data, setData] = useState(null);
  const [reqState, setReqState] = useState(null);
  const [error, setError] = useState(null);
  const [isRequesting, setIsRequesting] = useState(requestNow);

  useEffect(async () => {
    if (!isRequesting) return;

    try {
      setReqState(RequestState.fetching);

      const response = await fetch(url, options);
      const res = await response.json();

      if (!response.ok) {
        setError(res);
        setReqState(RequestState.error);
        setIsRequesting(false);
        return;
      }

      // Saving response data into state
      setData(res);
      setReqState(RequestState.success);
    } catch (error) {
      setError(error);
      setReqState(RequestState.error);
    } finally {
      setIsRequesting(false);
    }
  }, [url, isRequesting]);
  return [data, reqState, error, isRequesting, setIsRequesting];
}
