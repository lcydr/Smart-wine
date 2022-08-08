import request from "@/utils/request";
/**
 *获取区域列表
 * @param {object} data
 * @returns Promise
 */
export function getArealist(data) {
  return request({
    url: "/api/vm-service/region/search",
    params: data,
  });
}
/**
 * 获取点位列表
 * @returns Promise
 */
export function getPointlist1(data) {
  return request({
    url: "/api/vm-service/node/search",
    params: data,
  });
}
/**
 * 获取合作商列表
 * @returns Promise
 */
export function getPartnerlist(data) {
  return request({
    url: "/api/user-service/partner/search",
    params: data,
  });
}
/**
 * 获取区域详情
 * @param {number} regionId
 * @returns
 */
export function getRegionalDetails(regionId) {
  return request({
    url: "/api/vm-service/region/" + regionId,
  });
}
