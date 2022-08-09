import request from "@/utils/request";

export function getWorkOrder(data,taskId) {
  return request({
    url: `/api/task-service/task/taskInfo/${taskId}`,
    data
  });
}
