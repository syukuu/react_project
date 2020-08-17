import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// 使用Mock模拟接口  主机名+地址
// const MOCK_URL = 'http://localhost:8080/admin/edu/subject'
// 获取课程一级列表数据
export function reqGetSubject(page, limit) {
    return request({
        url: `${BASE_URL}/${page}/${limit}`,
        method: "GET",
    });
}

// 获取课程二级列表数据 
export function reqGetSecSubject(parentId) {
    return request({
        url: `${BASE_URL}/get/${parentId}`,
        method: "GET",
    });
}
