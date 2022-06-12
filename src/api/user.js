import request from '@/utils/request'

// 用来调用本地服务器接口，远程的ip:port在vue.config.js中修改
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getTest() {
  return request({
    url: '/getUserItem',
    method: 'get'
  })
}

export function picupload(params) {
  return request({
    url: '/picupload',
    method: 'post',
    data: params
  })
}
