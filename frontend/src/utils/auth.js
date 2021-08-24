export const BASE_URL = "https://auth.nomoreparties.co";

function request({ endPoint, method, body, requestHeaders }) {
  const fetchInit = {
    method: method,
    headers: Object.assign(
      {
        "Content-Type": "application/json",
      },
      requestHeaders
    ),
  };

  return fetch(
    `${BASE_URL}/${endPoint}`,
    body ? { ...fetchInit, body } : fetchInit
  ).then((res) => getResponseData(res));
}

export const authorize = (identifier, password) => {
  return request({
    endPoint: "signin",
    method: "POST",
    body: JSON.stringify({
      email: identifier,
      password: password,
    }),
  });
};

export const register = (identifier, password) => {
  return request({
    endPoint: "signup",
    method: "POST",
    body: JSON.stringify({
      email: identifier,
      password: password,
    }),
    requestHeaders: {
      Accept: "application/json",
    },
  });
};

export const getContent = (token) => {
  return request({
    endPoint: "users/me",
    method: "GET",
    requestHeaders: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

function getResponseData(res) {  
  return res.ok ? res.json() : Promise.reject(res.status);
}
