import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';


export const AuthAPI = {
  sendLoginEmail(email) {
    return fetch(`${API_URL}/auth/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`,
      },
      body: JSON.stringify({ email }),
    })
  },
  verifyEmailLogin(token) {
    return fetch(`${API_URL}/auth/email/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`,
      },
      body: JSON.stringify({ token_string: token }),
    })
  },
  getMe() {
    return fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`,
      },
    })
  },
}