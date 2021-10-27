import { url } from './auth.internal'

export const fetchCourses = (payload, token, setCourses) =>
  fetch(`${url}/students/${payload.sub}/courses`, {
    method: 'GET',
    withCredentials: true,
    mode: 'cors',
    'Access-Control-Allow-Origin': '*',
    credentials: 'same-origin',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => setCourses(response))
    .catch(error => console.error(error))

export const fetchProfile = (payload, token, setProfile) =>
  fetch(`${url}/students/${payload.sub}`, {
    method: 'GET',
    withCredentials: true,
    mode: 'cors',
    'Access-Control-Allow-Origin': '*',
    credentials: 'same-origin',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => setProfile(response))
    .catch(error => console.error(error))
