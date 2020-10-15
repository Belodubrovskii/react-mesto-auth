export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.data) {
      return res
    } else {
      return Promise.reject(res);
    }
  })
  .catch((err) => {
    console.log(err)
    throw err;
  })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response => response.json()))
  .then((res) => {
    if (res.token){
      localStorage.setItem('jwt', res.token);
      return res;
    } else {
      return Promise.reject(res);
    }
  })
  .catch(err => {
    console.log(err.message);
    throw err;
  })
};

export const isTokenValid = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(res => {
    if (res.data) {
      return res.data;
    } else {
      return Promise.reject(res);
    }
  })
  .catch(err => {
    console.log(err.message);
    throw err;
  })
}
