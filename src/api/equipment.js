import request from "@/utils/request";

/**
 * 获取售货机列表
 * @param {Object} data
 * @returns Promise
 */
export function getEquipment(data) {
  return request({
    url: "/api/vm-service/vm/search",
    params: data,
  });
}

/**
 * 获取售货机类型列表
 * @param {Object} data
 * @returns Promise
 */
export function getvmType(data) {
  return request({
    url: "/api/vm-service/vmType/search",
    params: data,
  });
}
