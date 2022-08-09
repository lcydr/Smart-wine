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
 * @param {number} id
 * @returns
 */
export function getRegionalDetails(id) {
  return request({
    url: "/api/vm-service/node/vmList/" + id,
  });
}
/**
 * 获取商圈列表
 * @returns Promise
 */
export function getbusinessdistrict() {
  return request({
    url: "/api/vm-service/businessType",
  });
}
/**
 * 修改商圈列表
 * @param {*} id
 * @returns
 */
export function postRevise(data, id) {
  return request({
    url: "/api/vm-service/node/" + id,
    method: "PUT",
    data,
  });
}
/**
 * 新增点位
 * @returns Promise
 */
export function postnewlist(data) {
  return request({
    url: "/api/vm-service/node",
    method: "POST",
    data,
  });
}
export function getxiangqingquyu(data) {
  return request({
    url: "/api/vm-service/node/search/",
    params: data,
  });
}
/**
 * 区域管理新增
 * @param {object} data
 * @returns
 */
export function pushxinzeng(data) {
  return request({
    url: "/api/vm-service/region",
    method: "POST",
    data,
  });
}
export function xiugaiquyu(id, data) {
  return request({
    url: `/api/vm-service/region/${id}`,
    method: "PUT",
    data,
  });
}
/**
 * 重置密码
 * @param {id} id
 * @returns
 */
export function chongzhimima(id) {
  return request({
    url: `/api/user-service/partner/resetPwd/${id}`,
    method: "PUT",
  });
}
/**
 *
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function xiugaihezuoshang(id, data) {
  return request({
    url: "/api/user-service/partner/" + id,
    method: "PUT",
    data,
  });
}
/**
 * 新增合作商
 * @returns Promise
 */
export function addshangjia(data) {
  return request({
    url: "/api/user-service/partner",
    method: "POST",
    data
  });
}
