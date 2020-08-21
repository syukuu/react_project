import { GET_ALL_COURSE, GET_ALL_CHAPTER } from './contants'
const initChapter = {
  allCourseList: [],
  chapterList: []
}
export default function chapterList(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE:
      return {
        ...prevState,
        allCourseList: action.data
      }
    case GET_ALL_CHAPTER:
      // console.log(action.data)
      action.data.items.forEach(item => {
        item.children = []
      })
      return {
        ...prevState,
        chapterList: action.data.items
      }
    default:
      return prevState
  }
}
