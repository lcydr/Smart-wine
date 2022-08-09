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

/**
 * 
 * @param {*} data 获取用户基本信息
 * @returns 
 */
export function getUserInfo (data) {
  return request({
    url: '/api/user-service/user/' + data,
    params: data
  })
}

/**
 * 
 * @param {*} data 删除
 * @returns 
 */
export function delPersonnel (data) {
  return request({
    url: '/api/user-service/user/' + data,
    method: 'DELETE',
    data
  })
}

// 区域列表
export function getRegion (data) {
  return request({
    url: '/api/vm-service/region/search',
    params: data
  })
}

/**
 * 
 * @param {*} data 添加人员
 * @returns 
 */
export function addPersonnel (data) {
  return request({
    url: '/api/user-service/user',
    method: 'POST',
    data
  })
}
/**
 * 
 * @param {*} id 修改人员
 * @returns 
 */
export function modifyPersonnel (data) {
  return request({
    url: '/api/user-service/user/' + data.userId,
    method: 'PUT',
    data
  })
}
/**
 * 
 * @returns 图片上传
 */
export function photo(fileName) {
  return request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data:fileName
  })
}

/**
 * 
 * @param {*} data 获取当时工单汇总信息(人员统计头部信息)
 * @returns 
 */
export function taskReportInfo (data) {
  return request({
    url: `/api/task-service/task/taskReportInfo/${data.start}/${data.end}`,
    method: 'GET',
    params:data
  })
}

/**
 * 
 * @param {*} data 工单状态统计
 * @returns 
 */
export function collectReport (data) {
  return request({
    url: `/api/task-service/task/collectReport/${data.start}/${data.end}`,
    method: 'GET',
    params:data
  })
}

/**
 * 
 * @param {*} data 人员排名
 * @returns 
 */
export function userWorkTop (data) {
  return request({
    url: `/api/task-service/task/userWorkTop10/${data.start}/${data.end}/${data.isRepair}/${data.regionId}/`,
    params:data
  })
}

