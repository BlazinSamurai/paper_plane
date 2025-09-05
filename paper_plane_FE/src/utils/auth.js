const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status} + ${res.message}`);
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// POST /signup for user registration
function signUp(info) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: info.userName,
      profilePic: info.profilePic,
      email: info.email,
      password: info.password,
    }),
  });
}

// POST /login for user authorization
function loginViaUsername(info) {
  return request(`${baseUrl}/loginViaUsername`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: info.value,
      password: info.password,
    }),
  });
}

// POST /login for user authorization
function loginViaEmail(info) {
  return request(`${baseUrl}/loginViaEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: info.value,
      password: info.password,
    }),
  });
}

function getUserInfo(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export { signUp, loginViaUsername, loginViaEmail, getUserInfo };
