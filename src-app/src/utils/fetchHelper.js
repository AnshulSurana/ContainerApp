const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export async function parseJSON(response) {
  return response.json ? response.json().catch(() => response) : response;
}

export async function checkStatus(response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorData = await parseJSON(response);

  const error = Error(response.statusText);
  error.response = response;
  error.status = response.status;
  error.errorData = errorData;
  throw error;
}

export function createOptions(verb, body) {
  const options = {
    method: verb,
    headers,
    cache: 'no-store'
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
}
