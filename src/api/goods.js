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

/**
 * 添加商品
 * @param {*} className
 * @returns
 */
export function addGoods(data) {
  return request({
    url: "/api/vm-service/sku",
    method: "POST",
    data,
  });
}
/**
 * 图片上传
 * @param {*} data
 * @returns
 */

export function Picture(fileName) {
  return request({
    url: "/api/vm-service/sku/fileUpload",
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    data: fileName,
  });
}

/**
 *修改商品
 * @param {*} skuName
 * @param {*} skuImage
 * @param {*} price
 * @param {*} brandName
 * @param {*} unit
 * @param {*} classId
 * @param {*} skuId
 * @returns
 */
export function changeGoods(data) {
  return request({
    url: "/api/vm-service/sku/" + data.skuId,
    method: "PUT",
    data,
  });
}

/**
 * 数据导入
 * @param {*} fileName
 * @returns
 */
export function importData(fileName) {
  return request({
    url: "/api/vm-service/sku/upload",
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    data: fileName,
  });
}
