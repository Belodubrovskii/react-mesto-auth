 import {apiOptions} from './utils.js'

 class Api {
  constructor({apiOptions}) {
    this._baseUrl = apiOptions.baseUrl;
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
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  getUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }

  updateUserInfo (name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('jwt')}`
      },
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
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('jwt')}`
      },
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
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }

  changeLikeCardStatus (cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }

  updateAvatar (imageLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: imageLink,
      })
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError);
  }
}

export const api = new Api({apiOptions});

