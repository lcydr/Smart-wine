import request from '@/utils/request'

/**
 * 
 * @param {*} data 策略搜索和获取列表
 * @returns 
 */
export function getStrategy (data) {
  return request({
    url: '/api/vm-service/policy/search',
    params:data,
  })
}

/**
 * 
 * @param {*} data 删除
 * @returns 
 */
export function delStrategy (data) {
  return request({
    url: '/api/vm-service/policy/' + data.policyId,
    method: 'DELETE',
    data
  })
}

/**
 * 
 * @param {*} data 新增
 * @returns 
 */
export function addStrategy (data) {
  return request({
    url: '/api/vm-service/policy',
    method: 'POST',
    data
  })
}

/**
 * 
 * @param {*} data 修改
 * @returns 
 */
export function xiuGaiStrategy (data) {
  return request({
    url: '/api/vm-service/policy/' + data.policyId,
    method: 'PUT',
   data
  })
}
/**
 * 
 * @param {*} data 根据策略搜索售货机
 * @returns 
 */
export function getXiangQing (data) {
  return request({
    url: '/api/vm-service/policy/vmList/' + data.policyId,
    params:data
  })
}