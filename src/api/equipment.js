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

/**
 * 获取一定时间内的订单总数
 * @param {Object} data
 * @returns Promise
 */
export function getOrderCount(data) {
  return request({
    url: "/api/order-service/report/orderCount",
    params: data,
  });
}

/**
 * 获取一定时间范围之内的收入
 * @param {Object} data
 * @returns Promise
 */
export function getOrderAmount(data) {
  return request({
    url: "/api/order-service/report/orderAmount",
    params: data,
  });
}

/**
 * 获取售货机补货次数
 * @param {String} innerCode 设备编号
 * @param {String} start 开始时间
 * @param {String} end 结束时间
 * @returns Promise
 */
export function getSupplyCount(innerCode, start, end) {
  return request({
    url:
      "/api/task-service/task/supplyCount/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
}

/**
 * 获取售货机维修次数
 * @param {String} innerCode 设备编号
 * @param {String} start 开始时间
 * @param {String} end 结束时间
 * @returns Promise
 */
export function getRepairCount(innerCode, start, end) {
  return request({
    url:
      "/api/task-service/task/repairCount/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
}

/**
 * 获取售货机商品销量
 * @param {String} innerCode 设备编号
 * @param {String} start 开始时间
 * @param {String} end 结束时间
 * @returns Promise
 */
export function getSkuCollect(innerCode, start, end) {
  return request({
    url:
      "/api/order-service/report/skuCollect/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
}

/**
 * 售货机类型删除
 * @param {String} typeId 类型ID
 * @returns Promise
 */
export function delVmType(typeId) {
  return request({
    url: "/api/vm-service/vmType/" + typeId,
    method: "DELETE",
  });
}

/**
 * 图片上传
 * @param {File} fileName 文件名称
 * @returns Promise
 */
export function postFileUpload(fileName) {
  return request({
    url: "/api/vm-service/sku/fileUpload",
    method: "POST",
    data: fileName,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

/**
 * 新增售货机类型
 * @param {Object} data 传入请求参数对象
 * @returns Promise
 */
export function postVmType(data) {
  return request({
    url: "/api/vm-service/vmType",
    method: "POST",
    data,
  });
}

/**
 * 获取售货机类型详情
 * @param {String} typeId 类型id
 * @returns Promise
 */
export function getvmTypeCurrent(typeId) {
  return request({
    url: "/api/vm-service/vmType/" + typeId,
  });
}

/**
 * 修改售货机类型
 * @param {Object} data 修改售货机类型参数
 * @returns Promise
 */
export function putVmType(data) {
  return request({
    url: "/api/vm-service/vmType/" + data.typeId,
    method: "PUT",
    data,
  });
}

/**
 * 点位搜索（获取点位信息）
 * @param {Object} data
 * @returns Promise
 */
export function getNode(data) {
  return request({
    url: "/api/vm-service/node/search",
    params: data,
  });
}

/**
 * 新增售货机
 * @param {Object} data 新增售货机所需参数
 * @returns Promise
 */
export function postVm(data) {
  return request({
    url: "/api/vm-service/vm",
    method: "POST",
    data,
  });
}

/**
 * 查询售货机策略
 * @param {String} id 设备编号
 * @returns Promise
 */
export function getVmPolicy(id) {
  return request({
    url: "/api/vm-service/policy/vmPolicy/" + id,
  });
}

/**
 * 新增策略
 * @param {Object} data 新增策略所需数据
 * @returns Promise
 */
export function postPolicy(data) {
  return request({
    url: "/api/vm-service/policy",
    data,
  });
}

/**
 * 取消策略
 * @param {Object} data 取消策略所需参数
 * @returns Promise
 */
export function putCancelPolicy(data) {
  return request({
    url:
      "/api/vm-service/vm/cancelPolicy/" + data.innerCode + "/" + data.policyId,
    method: "PUT",
  });
}

/**
 * 应用策略
 * @param {Object} data 应用策略所需参数
 * @returns Promise
 */
export function putApplyPolicy(data) {
  return request({
    url: "/api/vm-service/vm/applyPolicy",
    method: "PUT",
    data,
  });
}

/**
 * 修改售货机点位
 * @param {Object} data 修改售货机点位参数
 * @returns Promise
 */
export function putVmNode(data) {
  return request({
    url: "/api/vm-service/vm/" + data.id + "/" + data.nodeId,
    method: "PUT",
  });
}
