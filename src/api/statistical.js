import request from "@/utils/request";
/**
 * 合作商列表
 * @returns
 */
export function getPartnersApi(data) {
  return request({
    url: "/api/user-service/partner/search",
    params: data,
  });
}

export function getPartnerCollectApi(data) {
  return request({
    url: "/api/order-service/report/partnerCollect",
    data,
  });
}
