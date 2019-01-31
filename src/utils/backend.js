const checkStatus = response => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export default function loader(url, { method = "GET", data } = {}) {
  const settings = {
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json"
    },
    method
  };

  return fetch(url, settings)
    .then(checkStatus)
    .then(response => response.json());
}
