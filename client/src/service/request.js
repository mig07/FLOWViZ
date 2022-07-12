import React from "react";
import useFetch from "../hooks/useFetch";
import { RequestState } from "../hooks/useFetch";

export default function Request(url, options, onError, onSuccess, onLoading) {
  const [data, requestState, error] = useFetch(url, options);

  switch (requestState) {
    case RequestState.fetching:
      return onLoading;
    case RequestState.error:
      return onError(error);
    case RequestState.success:
      return onSuccess(data);
  }

  return <></>;
}
