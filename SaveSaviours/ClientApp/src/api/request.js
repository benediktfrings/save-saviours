

export default (path, method, data = undefined) => {
  const auth = window.localStorage.getItem('access-token')

  return fetch(`https://savesaviours.azurewebsites.net/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
    },
    mode: 'cors',
    body: data !== undefined ? JSON.stringify(data) : undefined,
  })
}
