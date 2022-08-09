import request from "@/utils/request";

export function getOrderApi(data) {
  return request({
    url: "/api/order-service/order/search",
        params: data,
  });
}
