const checkStatus = response => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export default function loader(url, settings) {
  return fetch(url, settings)
    .then(checkStatus)
    .then(response => response.json());
}
