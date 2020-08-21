import { reqGetAllCourse } from '@api/edu/course'
import { reqGetAllChapter } from '@api/edu/chapter'
import { reqGetAllLesson } from '@api/edu/lesson'
import { GET_ALL_COURSE, GET_ALL_CHAPTER, GET_ALL_LESSON } from './contants'


// 课程列表
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

// 章节列表
function getChapterListSync(data) {
    // console.log('同步action', data);
    return {
        type: GET_ALL_CHAPTER,
        data
    }
}
export function getChapterList(courseId) {
    return dispatch => {
        return reqGetAllChapter(courseId).then(res => {
            dispatch(getChapterListSync(res))
            // console.log('异步action', res);
        })
    }
}

// 学习列表
function getLessonListSync(data) {
    return { type: GET_ALL_LESSON, data }
}
export function getLessonList(chapterId) {
    return dispatch => {
        reqGetAllLesson(chapterId).then(res => {
            dispatch(getLessonListSync({ res, chapterId }))
        })
    }
}
