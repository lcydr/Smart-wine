import request from '@/utils/request'

/**
 * 
 * @param {*} data 人员列表
 * @returns 
 */
export function getPersonnelList (data) {
  return request({
    url: '/api/user-service/user/search',
    params: data
  })
}

/**
 * 
 * @param {*} data 人员工作量列表
 * @returns 
 */
export function getPersonnelWorkload (data) {
  return request({
    url: '/api/user-service/user/searchUserWork',
    params: data
  })
}

/**
 * 
 * @param {*} data 获取用户工作量(工单统计)
 * @returns 
 */
export function getUserWorkload (data) {
  return request({
    url: '/api/task-service/task/userWork',
    params: data
  })
}