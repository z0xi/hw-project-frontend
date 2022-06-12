import request from '@/utils/request-remote'

// 用来调用远程服务器接口，远程的ip:port在vue.config.js中修改

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
