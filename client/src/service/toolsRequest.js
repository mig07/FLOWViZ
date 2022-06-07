import Request from "./request";

const url = `${config.appProtocol}://${config.address}:${config.port}/tool`;

export default function getTools(onLoading, onError, onSuccess) {
  Request(url, {}, onError, onSuccess, onLoading);
}
