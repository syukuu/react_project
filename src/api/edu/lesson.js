
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

// 获取上传视频的token
export function reqGetUploadToken() {
    return request({
        url: '/uploadtoken',
        method: 'GET'
    })
}

// 更新课时
export function addLesson({ chapterId, title, free, video }) {
    return request({
        url: `${BASE_URL}/save`,
        method: 'POST',
        data: {
            chapterId,
            title,
            free,
            video
        }
    })
}

// 批量删除课时章节
export function reqBatchRemoveLessonList(lessonIdList) {
    // console.log(courseId)
    return request({
        url: `${BASE_URL}/batchRemove`,
        method: 'DELETE',
        data: {
            idList: lessonIdList
        }
    })
}