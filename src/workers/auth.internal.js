// api url
export const url = 'https://hit-api-xqpilz5vla-wm.a.run.app/api/v1'

// sign in function
export const signIn = async (email, password) => {
  // hash email and password together
  const hash = window.btoa(email + ':' + password)

  // set http headers and return the results
  try {
    return await (
      await fetch(`${url}/student/token`, {
        method: 'GET',
        withCredentials: true,
        mode: 'cors',
        'Access-Control-Allow-Origin': '*',
        credentials: 'same-origin',
        headers: {
          Authorization: 'Basic ' + hash,
          'Content-Type': 'application/json'
        }
      })
    ).json()
  } catch (err) {
    console.log(err)
  }
}

export const signUp = () => {}