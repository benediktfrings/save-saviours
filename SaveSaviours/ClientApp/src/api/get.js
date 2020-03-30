import request from './request'

export default (path) => request(path, 'GET')
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    throw response
  })
