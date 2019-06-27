import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';


export const EndUsersAPI = {
  getEndUsers(page=1, perPage=10) {
    return fetch(`${API_URL}/end_users?page=${page}&per_page=${perPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`,
      },
    })
  },
  getEndUsersSMSLogins(page=1, perPage=10) {
    return fetch(`${API_URL}/end_users/sms-logins?page=${page}&per_page=${perPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`,
      },
    })
  },
  getEndUsersEmailLogins(page=1, perPage=10) {
    return fetch(`${API_URL}/end_users/email-logins?page=${page}&per_page=${perPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`,
      },
    })
  },
}