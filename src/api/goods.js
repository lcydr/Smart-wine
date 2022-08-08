import request from "@/utils/request";
// 商品类型搜索
export function getGoodsList() {
  return request({
    url: "/api/vm-service/skuClass/search",
  });
}

//修改商品类型
export function changeType(className, classId) {
  return request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: "PUT",
    data: {
      className,
      classId,
    },
  });
}

//删除商品类型
export function DelType(classId) {
  return request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: "DELETE",
  });
}

// 商品搜索
export function getList() {
  return request({
    url: "/api/vm-service/sku/search",
  });
}
