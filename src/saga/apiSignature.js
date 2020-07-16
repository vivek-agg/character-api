import axios from 'axios';

export function getCallWithParams(url, params) {
  const config = {};
  config.params = params;
  return axios
    .get(url, config)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
