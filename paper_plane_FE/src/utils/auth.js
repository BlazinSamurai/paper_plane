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
function login(info) {
  return request(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: info.email,
      password: info.password,
    }),
  });
}

export { signUp, login };
