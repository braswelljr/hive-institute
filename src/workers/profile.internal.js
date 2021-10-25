import { url } from './auth.internal'

export const getProfile = async (payload, token) => {
  token = typeof token === 'object' ? token.token : token
  payload = typeof payload === 'object' ? payload.sub : payload
  try {
    return await (
      await fetch(`${url}/students/${payload}`, {
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
    ).json()
  } catch (err) {
    console.log(err)
  }
}
