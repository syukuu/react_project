import { reqGetAllCourse } from '@api/edu/course'
import { reqGetAllChapter } from '@api/edu/chapter'
import { GET_ALL_COURSE, GET_ALL_CHAPTER } from './contants'


// 获取课程
function getCourseListSync(data) {
    return {
        type: GET_ALL_COURSE,
        data
    }
}
export function getCourseList() {
    return dispatch => {
        reqGetAllCourse().then(res => {
            dispatch(getCourseListSync(res))
        })
    }
}

// 获取章节
function getChapterListSync(data) {
    return {
        type: GET_ALL_CHAPTER,
        data
    }
}
export function getChapterList(courseId) {
    return dispatch => {
        reqGetAllChapter(courseId).then(res => {
            dispatch(getChapterListSync(res))
        })
    }
}



