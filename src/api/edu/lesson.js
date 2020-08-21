
import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'

// 获取所有课程列表
//http://localhost:5000/admin/edu/lesson/get/:chapterId
export function reqGetAllLesson(chapterId) {
    return request({
        url: `${BASE_URL}/get/${chapterId}`,
        method: 'GET'
    })
}