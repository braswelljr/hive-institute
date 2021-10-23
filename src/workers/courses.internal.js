import { url } from './auth.internal'

export const getCourses = async (payload, token) => {
  if (
    payload !== null ||
    payload !== undefined ||
    token !== null ||
    token !== undefined
  ) {
    token = typeof token === 'object' ? token.token : token
    try {
      return await (
        await fetch(`${url}/students/${payload.sub}/courses`, {
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
}
