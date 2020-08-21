import { GET_ALL_COURSE, GET_ALL_CHAPTER, GET_ALL_LESSON } from './contants'
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
      // console.log('reducer', action.data.items)
      action.data.items.forEach(item => {
        item.children = []
      })
      return {
        ...prevState,
        chapterList: action.data.items
      }
    case GET_ALL_LESSON:
      const newItems = [...prevState.chapterList]
      newItems.forEach(item => {
        if (item._id === action.data.chapterId) {
          item.children = action.data.res
        }
      })
      return {
        ...prevState,
        chapterList: newItems
      }
    default:
      return prevState
  }
}
