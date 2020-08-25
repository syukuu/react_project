import { reqGetAllCourse } from '@api/edu/course'
import { reqGetAllChapter, reqBatchRemoveChapterList } from '@api/edu/chapter'
import { reqGetAllLesson, reqBatchRemoveLessonList } from '@api/edu/lesson'
import { GET_ALL_COURSE, GET_ALL_CHAPTER, GET_ALL_LESSON, REMOVE_LESSONS, REMOVE_CHAPTERS } from './contants'


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


// 批量删除课时
// 同步action
function delLessonListSync(data) {
    return { type: REMOVE_LESSONS, data }
}

export function delLessonList(lessonIds) {
    return dispatch => {
        return reqBatchRemoveLessonList(lessonIds).then(res => {
            dispatch(delLessonListSync(lessonIds))
        })
    }
}

// 批量删除章节
// 同步action
function delChapterListSync(data) {
    return { type: REMOVE_CHAPTERS, data }
}

export function delChapterList(chapterIds) {
    return dispatch => {
        return reqBatchRemoveChapterList(chapterIds).then(res => {
            dispatch(delChapterListSync(chapterIds))
        })
    }
}
