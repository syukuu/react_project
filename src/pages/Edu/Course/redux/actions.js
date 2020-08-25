import { reqGetAllCourse } from '@api/edu/course'
import { GET_ALL_COURSE } from './constants'

// 获取所有课程列表
function getAllCourseListSync(data) {
    return {
        type: GET_ALL_COURSE,
        data
    }
}
export function getAllCourseList() {
    return dispatch => {
        return reqGetAllCourse().then(res => {
            dispatch(getAllCourseListSync(res))
        })
    }
}
