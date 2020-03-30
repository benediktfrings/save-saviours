import request from 'api/request'

export default (path, data) => request(path, 'POST', data)
