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

// 添加数据
// http://localhost:5000/admin/edu/subject/save
export function reqAddSubject(title, parentId) {
    console.log(title);
    return request({
        url: `${BASE_URL}/save`,
        method: "POST",
        data: {
            title,
            parentId
        }
    });
}

// 更新数据
// http://localhost:5000/admin/edu/subject/update
export function reqSubjectUpdate(id, title) {
    return request({
        url: `${BASE_URL}/update`,
        method: "PUT",
        data: {
            id,
            title,
        }
    });
}

// 删除数据
// http://localhost:5000/admin/edu/subject/remove/:id
export function reqSubjectDel(id) {
    console.log('进入api');
    console.log(id);
    return request({
        url: `${BASE_URL}/remove/${id}`,
        method: "DELETE"
    });
}



// 获取所有课程分类数据
export function reqAllSubjectList() {
    return request({
        url: BASE_URL,
        method: 'GET'
    })
}
