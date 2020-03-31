

export default (path, method, data = undefined) => {
  const auth = window.localStorage.getItem('access-token')

  return fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
    },
    mode: 'same-origin',
    body: data !== undefined ? JSON.stringify(data) : undefined,
  })
}
