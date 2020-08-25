
import request from '@utils/request'

const BASE_URL = '/admin/edu/chapter'

// 获取所有章节列表
export function reqGetAllChapter(courseId) {
    return request({
        url: `${BASE_URL}/1/10`,
        method: 'GET',
        params: {
            courseId
        }
    })
}

// 批量删除章节
export function reqBatchRemoveChapterList(chapterIdList) {
    // console.log(courseId)
    return request({
        url: `${BASE_URL}/batchRemove`,
        method: 'DELETE',
        data: {
            idList: chapterIdList
        }
    })
}