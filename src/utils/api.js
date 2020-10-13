 import {apiOptions} from './utils.js'

 class Api {
  constructor({apiOptions}) {
    this._baseUrl = apiOptions.baseUrl;
    this._headers = apiOptions.headers;
  }

  _handleResponse(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.statusText)
    }
  }

  _handleResponseError(err){

    return Promise.reject(err.message)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  getUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }

  updateUserInfo (name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers:
        this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }

  addCard (data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers:
        this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }

  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers:
        this._headers,
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }

  changeLikeCardStatus (cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers:
        this._headers,
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }

  updateAvatar (imageLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers:
        this._headers,
      body: JSON.stringify({
        avatar: imageLink,
      })
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }
}

export const api = new Api({apiOptions});

