import request from '@/utils/request-remote'

// 用来调用远程服务器接口，远程的ip:port在vue.config.js中修改

export function getCertList() {
  return request({
    url: '/myca/queryAll',
    method: 'get'
  })
}

export function queryServiceList() {
  return request({
    url: '/myca/queryServiceList',
    method: 'get'
  })
}

export function requestRemoteUpload(params) {
  return request({
    url: '/myca/upload',
    method: 'get'
    // data: params
  })
}

export function requestRemoteService(params) {
  return request({
    url: '/myca/verify',
    method: 'post',
    data: params
  })
}

export function deleteCert(params) {
  return request({
    url: '/myca/deleteCert/' + params,
    method: 'delete'
  })
}
