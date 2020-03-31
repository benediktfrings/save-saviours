const HOST = process.env.REACT_APP_BACKEND_HOST

export default (path, method, data = undefined) => {
  const auth = window.localStorage.getItem('access-token')

  return fetch(`${HOST}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
    },
    mode: 'cors',
    body: data !== undefined ? JSON.stringify(data) : undefined,
  })
}
