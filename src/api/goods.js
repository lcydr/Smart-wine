import request from "@/utils/request";

/**
 * 商品类型搜索
 * @param {*} data
 * @returns
 */
export function getGoodsList(data) {
  return request({
    url: "/api/vm-service/skuClass/search",
    params: data,
  });
}

/**
 * 添加商品类型
 * @param {*} className
 * @returns
 */
export function addGoodsType(className) {
  return request({
    url: "/api/vm-service/skuClass",
    method: "POST",
    data: {
      className,
    },
  });
}

/**
 * 修改商品类型
 * @param {*} className
 * @param {*} classId
 * @returns
 */
export function changeType(className, classId) {
  return request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: "PUT",
    data: {
      className,
    },
  });
}

/**
 * 删除商品类型
 * @param {*} classId
 * @returns
 */
export function DelType(classId) {
  return request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: "DELETE",
  });
}

/**
 * 商品搜索
 * @returns Promise
 */
export function getList(params) {
  return request({
    url: "/api/vm-service/sku/search",
    params,
  });
}
