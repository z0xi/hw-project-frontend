import request from '@/utils/request-remote'

// 用来调用远程服务器接口，远程的ip:port在vue.config.js中修改

export function getCertList() {
  return request({
    url: '/queryAll',
    method: 'get'
  })
}

export function getServiceList() {
  return request({
    url: '/queryAll',
    method: 'get'
  })
}

export function requestRemoteUpload(params) {
  return request({
    url: '/myca/upload',
    method: 'get'
    // id: params
  })
}

export function requestRemoteService() {
  return request({
    url: '/myca/verify',
    method: 'put'
  })
}
